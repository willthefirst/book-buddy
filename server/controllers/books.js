const Book = require('../models/book')
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
        console.log(`1) Added book ${book.title} to user ${req.user.email}`);
        return user
      })

      // Save user to book
      book.users.push(req.user._id);
      const saveUserToBook = book.save().then(function(book) {
        console.log(`2) Added user ${req.user.email} to book ${book.title}`);
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
  Book.findById(req.params.id, function (err, book) {
    if (err) return console.error(err);
    res.send(book);
  })
};

// Update the current book
exports.updateBook = function(req, res) {

  // #todo: would prefer to have the update be piecemeal instead of making a giant object every time.
  // const update = {
  //   title: req.body.title,
  //   author: req.body.author,
  //   totalPages: req.body.totalPages,
  //   status: req.body.status,
  //   notes: req.body.notes,
  //   progress: req.body.progress
  // }
  const update = req.body

  Book.findByIdAndUpdate(req.params.id, { $set: update }, { new: true }, function (err, book) {
    if (err) return console.error(err);
    res.send(book);
  });
};

// Delete the current book
exports.deleteBook = function(req, res) {
  Book.findByIdAndRemove(req.params.id, function (err, deletedBook) {
    if (err) return console.error(err);
    res.send(deletedBook);
  });
};
