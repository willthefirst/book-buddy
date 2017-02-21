const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = mongoose.Schema({
    // GENERAL
    title: {
      type: String,
      default: 'Title'
    },
    author: {
      type: String,
      default: 'Author'
    },
    gBooks_id: {
      type: 'String'
    }
    
    // USER-SPECIFIC
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
    },
    users: {
      type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Book', BookSchema);
