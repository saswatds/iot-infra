const mqtt = require('mqtt'),
  logger = require('winston'),
  _ = require('lodash'),
  async = require('async'),
  OPP_TOPICS = ['log'];

class MQTT {
  constructor(url, app) {
    this.url = url;
    this.listeners = {};
    this.app = app;
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
          const waterFalls =  _.concat([], starterFunction, pipeline.operations, this._finalizer.bind(this, pipeline));
          return async.reflect((cb)=> {
            async.waterfall(waterFalls,cb);
          });
        });

      async.parallel(parallelPipelines, (err, results)=> {
        if(err) {
          this.app.service('log').create({origin: 'error', message: err.toString()});
        }
        logger.info('processed topic:', topic, results);
      });
    }
  }

  _finalizer({output, name}, data, cb) {
    const oppOutputs = _.intersection(output, OPP_TOPICS),
      topicOutputs = _.difference(output, OPP_TOPICS),
      dataString = data && data.toString && data.toString() || JSON.stringify(data)|| '';

    topicOutputs.forEach((topic)=>this.client.publish(topic, dataString));
    async.map(oppOutputs, (topic, cb)=> {
      (topic === 'log') && this.app.service('log').create({origin:name, message: dataString});
      cb();
    }, cb);
  }

  updateListener(data) {
    const { id, name, input, output, operations } = data;
    _.each(input, (inp)=> {
      _.isArray(this.listeners[inp]) && _.union(this.listeners[inp], {id,name, operations, output}) ||
        (this.listeners[inp] = [{id, name, operations, output}]);
    });
  }

  removeListener(data) {
    this.listeners = _.omitBy(this.listeners, (listener)=> {
      return listener.id === data.id;
    });
  }
}

module.exports.MQTT = MQTT;
