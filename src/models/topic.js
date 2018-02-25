const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const TopicSchema = new Schema({
  type: String,
  topic: {
    type: String,
    unique: true
  },
});


module.exports = mongoose.model('Topic', TopicSchema);
