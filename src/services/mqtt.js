const mqtt = require('mqtt'),
  logger = require('winston'),
  _ = require('lodash'),
  async = require('async');

class MQTT {
  constructor(url) {
    this.url = url;
    this.listeners = {};
  }
  connect () {
    this.client = mqtt.connect(this.url);
    this.client.on('message', (topic, message)=> {
      this.process.call(this,topic, message.toString());
    });

    return new Promise((resolve)=> {
      this.client.on('connect', ()=> {
        this.client.subscribe('#');
        resolve();
      });
    });
  }

  process(topic, message) {
    const pipelines = this.listeners[topic];
    if(pipelines && _.isArray(pipelines)) {
      // execute all operations for all pipelines
      // This the place where we can spawn muliple processes, etc, job definations
      const starterFunction = (cb)=> cb(null, message),
        parallelPipelines = _(pipelines).map((pipeline)=> {
          const waterFalls =  _.concat([], starterFunction, pipeline.operations, this._finalizer.bind(this, pipeline.output));
          return async.reflect((cb)=> {
            async.waterfall(waterFalls,cb);
          });
        });

      async.parallel(parallelPipelines, (err, results)=> {
        logger.info(results);
      });
    }
  }

  _finalizer(outputs, data, cb) {
    cb(null);
  }

  updateListener(data) {
    const { id, input, output, operations } = data;
    _.each(input, (inp)=> {
      _.isArray(this.listeners[inp]) && this.listeners[inp].push({id, operations, output}) ||
        (this.listeners[inp] = [{id, operations, output}]);
    });
  }

  removeListener(data) {
    this.listeners = _.omitBy(this.listeners, (listener)=> {
      return listener.id === data.id;
    });
  }
}

module.exports.MQTT = MQTT;
