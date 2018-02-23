const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const PipelineSchema = new Schema({
  _id: String,
  name: String,
  input: [String],
  output: [String],
  operations: [Schema.Types.Mixed]
});


module.exports = mongoose.model('Pipeline', PipelineSchema);
