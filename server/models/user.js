const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

mongoose.Promise = global.Promise

const EntrySchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  book_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const BookPersonalSchema = new Schema({
  book_id: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
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
})

/* User Schema */
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  books: [BookPersonalSchema],
  progress:  [EntrySchema]
}, {
  timestamps: true
})

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
  const user = this,
    SALT_FACTOR = 5

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return cb(err) }

    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
