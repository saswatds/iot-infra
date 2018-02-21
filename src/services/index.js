const {Pipeline} = require('./pipeline'),
  {MQTT} = require('./mqtt'),
  mongoose = require('mongoose'),
  PipelineModel = require('../models/pipeline'),
  logger = require('winston');

module.exports = function (app) {
  mongoose.Promise = global.Promise;
  // Connect to your MongoDB instance(s)
  mongoose.connect('mongodb://localhost:27017/feathers', {
    useMongoClient: true
  });

  const mqtt = new MQTT(app.get('mqtt'));
  const pipeline = new Pipeline({Model: PipelineModel, lean: true}, mqtt);

  // Add pipelines
  app.use('/pipeline', pipeline);

  // Connect to the mqtt broker;
  mqtt.connect().then(() => logger.info('MQTT Client connected'));
};
