const Book = require('../models/book')
const User = require('../models/user')
const config = require('../../config/project.config')
const moment = require('moment')

// Get all the books
exports.getAllBooks = function(req, res) {
  console.log(req.user);
  // Get all book ids belonging to user
  const bookIds = req.user.books.map(function(book) {
    return book.book_id
  });

  // Return all book documents
  Book.find({'_id': { $in: bookIds }}, function (err, books) {
    console.log('Books found:', books);
    if (err) return console.error(err);
    res.send(books);
  })
}

// Add a new book
exports.createBook = function(req, res) {
  const query = Book.findOne({ gBooks_id: req.body.gBooks_id })
  const promise = query.exec();

  // Check to see books already exists in books collection
  promise.then(function (book) {
    if (!book) {
      // If book doesn't already exists in our db, add it. Once added, return to next promise.
      console.log('Book does not exists yet, creating it...');
      let newBook = { title, authors, thumbnailUrl, gBooks_id } = req.body
      // this return is important to make then() wait before executing.
      return Book.create(newBook).then(function(book) {
        return book
      })
    } else {
      // If it already exists, just return it.
      return book
    }
  }).then(function (book) {
    // Save book to user
    const bookPersonal = {
      book_id: book._id,
      totalPages: req.body.totalPages
    }
    req.user.books.push(bookPersonal);
    const saveBookToUser= req.user.save().then(function(user) {
      console.log(`Added book ${book.title} to user ${req.user.email}`);
      return user
    })

    // Save user to book
    book.users.push(req.user._id);
    const saveUserToBook = book.save().then(function(book) {
      console.log(`Added user ${req.user.email} to book ${book.title}`);
      return book
    })

    return Promise.all([saveBookToUser, saveUserToBook]).then(function(results) {
      return results
    })
  }).then(function (results) {
    const updatedUser = results[0],
    updatedBook = results[1]
    res.send(updatedBook)
  }).catch(function(error) {
    console.log('Error creating book:', error)
  });
};

function extractProgress(progressArray, book_id) {
  let slimProgress = [];

  // Get only entries that correspond to the book_id
  progressArray.forEach((entry) => {
    if (entry.book_id.toString()  === book_id.toString()) {
      slimProgress.push({
        date: entry.date,
        currentPage: entry.currentPage
      })
    }
  })

  // Sort entries by date #todo does this need to happen here?
  slimProgress.sort(function(a,b) {
    return b.date - a.date
  })

  // Reformat date once sorted
  slimProgress = slimProgress.map((entry) => {
    return {
      currentPage: entry.currentPage,
      date: moment(entry.date).format('MM/DD/YYYY')
    }

  })

  return slimProgress
}

// Find the current book
exports.getBook = function(req, res) {
  // Get book-specific data
  const bookInfo = Book.findById(req.params.id).then(function(bookGeneral) {
    // Get user specific data
    const bookPersonal = req.user.books.find((item) => {
      return (item.book_id.toString() === req.params.id.toString())
    })

    const slimProgress = extractProgress(req.user.progress, req.params.id);

    // Respond with a combined book object with all the info the client needs
    res.send({
      status: bookPersonal.status[0],
      totalPages: bookPersonal.totalPages,
      progress: slimProgress,
      notes: bookPersonal.notes,
      _id: bookGeneral._id,
      thumbnailUrl: bookGeneral.thumbnailUrl,
      authors: bookGeneral.authors,
      title: bookGeneral.title
    })
  }).catch(function(error) {
    return console.error(error)
  })
};

// Add a progress entry to a given book
exports.updateProgress = function(req, res) {
  const progressEntry = req.body

  // Construct query
  const query = {
    '_id': req.user._id,
    'books.book_id': req.params.id
  }

  // Apply the update and respond
  User.findOneAndUpdate(query, { $push: { progress: progressEntry } }, { new: true }, function (err, updatedUser) {
    if (err) return console.error(err);
    const newProgress = extractProgress(updatedUser.progress, req.params.id)
    res.send(newProgress);
  });
}

// Update the current book
exports.updateBook = function(req, res) {
  const requestedUpdate = req.body

  // Construct query
  const query = {
    '_id': req.user._id,
    'books.book_id': req.params.id
  }

  // Construct granular update of subdocs dynamically.
  // Update the specified book with whatever parameters provided by request
  const update = {}
  for (key in requestedUpdate) {
    update[`books.$.${key}`] = requestedUpdate[key];
  }

  // Apply the update and respond
  User.findOneAndUpdate(query, { $set: update }, { new: true }, function (err, updatedUser) {
    if (err) return console.error(err);
    res.send(requestedUpdate);
  });
};

// Delete the current book
exports.deleteBook = function(req, res) {
  const removeBookFromUser = User.findOneAndUpdate({'_id': req.user._id}, { '$pull': { books: { book_id: req.params.id } } })
  const removeUserFromBook = Book.findOneAndUpdate({'_id': req.params.id}, { '$pull': { users: req.user._id } })

  Promise.all([removeBookFromUser, removeUserFromBook]).then(function(results) {
    res.send(results)
  }).catch(function(error) {
    console.log('Error deleting book:', error)
  });

};
