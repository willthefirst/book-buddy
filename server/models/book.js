const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = mongoose.Schema({
    title: {
      type: String,
      default: 'Title'
    },
    author: {
      type: String,
      default: 'Author'
    },
    status: {
      type: Array,
      default: 'Queue',
      enum: ['Queue', 'Current', 'Finished']
    },
    totalPages: {
      type: Number,
      default: 42
    },
    notes: {
      type: String,
      default: ''
    }
});

module.exports = mongoose.model('Book', BookSchema);
