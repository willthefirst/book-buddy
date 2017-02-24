const Book = require('../models/book')
const User = require('../models/user')
const config = require('../../config/project.config')

// Get all the books
exports.getAllBooks = function(req, res) {
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


// Find the current book
exports.getBook = function(req, res) {
  // Get book-specific data
  const bookInfo = Book.findById(req.params.id).then(function(bookGeneral) {
    // Get user specific data
    const bookPersonal = req.user.books.find((item) => {
      return (item.book_id.toString() === req.params.id.toString())
    })

    // Respond with a combined book object with all the info the client needs
    res.send({
      status: bookPersonal.status,
      totalPages: bookPersonal.totalPages,
      notes: bookPersonal.notes,
      _id: bookGeneral._id,
      thumbnailUrl: bookGeneral.thumbnailUrl,
      authors: bookGeneral.authors,
      title: bookGeneral.title
    })
  }).catch(function(error) {
    return console.error(err);
  })
};

// Dynamically construct update for books (which are hard to update as subdocs of a user)
const createUpdate = (updateFromClient) => {
  const update = {};
  for (key in updateFromClient) {
    update[`books.$.${key}`] = updateFromClient[key];
  }
  return update
}

// Update the current book
exports.updateBook = function(req, res) {

  const update = createUpdate(req.body);

  const query =  {
    '_id': req.user._id,
    'books.book_id': req.params.id
  }

  User.findOneAndUpdate(query, { $set: update }, { new: true }, function (err, updatedUser) {
    if (err) return console.error(err);

    const updatedBook = updatedUser.books.find((item) => {
      return (item.book_id.toString() === req.params.id.toString())
    })

    // Just send granular update rather than whole object
    const update = {
      totalPages: updatedBook.totalPages,
      status: updatedBook.status
    }

    res.send(update);
  });
};

// Delete the current book
exports.deleteBook = function(req, res) {
  Book.findByIdAndRemove(req.params.id, function (err, deletedBook) {
    if (err) return console.error(err);
    res.send(deletedBook);
  });
};
