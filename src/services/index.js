const {Pipeline} = require('./pipeline'),
  {MQTT} = require('./mqtt'),
  mongoose = require('mongoose'),
  { Service } = require('feathers-mongoose'),
  PipelineModel = require('../models/pipeline'),
  LogModel = require('../models/log'),
  TopicModel = require('../models/topic'),
  logger = require('winston');

module.exports = function (app) {
  mongoose.Promise = global.Promise;
  // Connect to your MongoDB instance(s)
  mongoose.connect(app.get('mongodb'));

  // Setup the log service
  app.use('/log', new Service({Model: LogModel, lean: true}));
  app.use('/topic', new Service({Model: TopicModel, lean: true}));

  const mqtt = new MQTT(app.get('mqtt'), app);
  const pipeline = new Pipeline({Model: PipelineModel, lean: true}, mqtt);

  // Add pipelines
  app.use('/pipeline', pipeline);

  // Connect to the mqtt broker;
  mqtt.connect().then(() => logger.info('MQTT Client connected'));
};
