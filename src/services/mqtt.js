const mqtt = require('mqtt'),
  logger = require('winston'),
  _ = require('lodash'),
  async = require('async');

class MQTT {
  constructor(url, app) {
    this.url = url;
    this.listeners = [];
    this.app = app;
  }
  connect () {
    this.client = mqtt.connect(this.url);
    this.client.on('message', (topic, message)=> {
      if(topic === 'identity') {
        // If identity topic then update this topic
        const parts = message.toString().split(':'),
          payload = {type: parts[0], topic: parts[1]};
        parts && parts.length === 2 && this.app.service('topic')
          .find({ query: payload})
          .then((topic)=> {
            if(!topic || topic.length === 0) this.app.service('topic').create(payload);
          });
      } else {
        this.app.service('topic').patch(null, {value: message.toString()}, {query: {topic}});
      }

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
    const pipelines = _.filter(this.listeners, (listener) => {
        return _.includes(listener.input, topic);
      }),
      starterFunction = (cb)=> {
        return cb(null, {topic, message});
      };

    if(pipelines && _.isArray(pipelines) && pipelines.length) {
      // execute all operations for all pipelines
      // This the place where we can spawn multiple processes, etc, job definitions
      const parallelPipelines = _(pipelines)
        .map((pipeline) => {
          const waterFalls =_.concat([],
            starterFunction,
            pipeline.operations,
            this._finalizer.bind(this, pipeline));

          return async.reflect((cb)=> async.waterfall(waterFalls,cb));
        })
        .value();

      async.parallel(parallelPipelines, (err, results)=> {
        _.forEach(results, (result)=>{
          if(result.error) {
            logger.error(result.error);
          } else{
            logger.info('processed topic:', topic, result.value);
          }
        });
      });
    }
  }

  _finalizer({output}, data, cb) {
    output.forEach((topic) => {
      const dataString = data[topic] && data[topic].toString && data[topic].toString() || JSON.stringify(data[topic])|| '';
      this.client.publish(topic, dataString);
    });
    cb(null, data);
  }

  updateListener(data) {
    this.listeners = _.unionBy(this.listeners, [data], 'id');
  }

  removeListener(data) {
    _.remove(this.listeners, (listener)=> {
      return listener.id.toString() === data.id.toString();
    });
  }
}

module.exports.MQTT = MQTT;
