const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const BookSchema = mongoose.Schema({
  // GENERAL
  title: {
    type: String,
    default: 'Title'
  },
  authors: {
    type: [String]
  },
  gBooks_id: {
    type: 'String'
  },
  thumbnailUrl: {
    type: 'String'
  },

  // USER-SPECIFIC
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('Book', BookSchema)
