const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const LogSchema = new Schema({
  message: String,
  timestamp: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('Log', LogSchema);
