const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const PipelineSchema = new Schema({
  name: String,
  inputs: [String],
  output: [String],
  operations: [Schema.Types.Mixed]
});


module.exports = mongoose.model('Pipeline', PipelineSchema);
