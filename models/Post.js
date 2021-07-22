const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  selectedFile: {
    type: String
  },
  likeCount: {
    type: Number,
    default: 0
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
})

//const postMessage = mongoose.model('PostMessage',PostSchema);
//export default postMessage;
module.exports = mongoose.model('Posts',PostSchema);