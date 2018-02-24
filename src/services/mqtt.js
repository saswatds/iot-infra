const mqtt = require('mqtt'),
  logger = require('winston'),
  _ = require('lodash'),
  async = require('async'),
  OPP_TOPICS = ['log'];

const  context = Object.create({
  _: _,
  async: async,
  process: null,
  __filename: null,
  __dirname: null,
  console: null,
  exports: null,
  global: null,
  module: null,
  require: null
});

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
          const operations = _.map(pipeline.operations, (opp)=> opp.bind(context)),
            waterFalls =  _.concat([], starterFunction, operations, this._finalizer.bind(this, pipeline));
          return async.reflect((cb)=> {
            async.waterfall(waterFalls,cb);
          });
        });

      try {
        async.parallel(parallelPipelines, (err, results)=> {
          if(err) {
            this.app.service('log').create({origin: 'ERROR', message: err.toString()});
            return logger.error(err);
          }
          logger.info('processed topic:', topic, results);
        });
      } catch (err) {
        this.app.service('log').create({origin: 'CRITICAL', message: err.toString()});
        logger.error(err);
      }
    }
  }

  _finalizer({output, name}, data, cb) {
    const oppOutputs = _.intersection(output, OPP_TOPICS),
      topicOutputs = _.difference(output, OPP_TOPICS),
      dataString = data && data.toString && data.toString() || JSON.stringify(data)|| '';

    topicOutputs.forEach((topic)=>this.client.publish(topic, dataString));
    oppOutputs.forEach((topic)=> {
      (topic === 'log') && this.app.service('log').create({origin: _.toUpper(name), message: dataString});
    });
    cb(data);
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
