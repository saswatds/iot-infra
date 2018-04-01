const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const TopicSchema = new Schema({
  type: String,
  topic: {
    type: String,
    unique: true
  },
  value: {
    type: String
  }
});


module.exports = mongoose.model('Topic', TopicSchema);
