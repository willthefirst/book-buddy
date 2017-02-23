const Book = require('../models/book')
const jwt = require('jsonwebtoken')
config = require('../../config/project.config')

function decodeToken(token) {
  return jwt.verify(token, config.server_secret);
}

// Get all the books
exports.getAllBooks = function(req, res) {
  Book.find(function (err, books) {
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
        let newBook = { title, authors, thumbnailUrl, totalPages, gBooks_id } = req.body
        // this return is important to make then() wait before executing.
        return Book.create(newBook).then(function(book) {
          return book
        })
      } else {
        // If it already exists, just return it.
        return book
      }
    }).then(function (book) {
      // Pair the user to the book and vice versa
      // NEXT: update both users and books collections here using Promise.all, then move to the next.
      // Add the current user to the books collections users array
      book.users.push(req.user._id);
      return book.save().then(function() {
        console.log(`Added user ${req.user.email} to book ${book.title}`);
        return book
      })
    }).then(function (book) {
      console.log('here');
    }).catch(function(error) {
      console.log('Error creating book:', error)
    });


  // let book = { title, authors, thumbnailUrl, totalPages, gBooks_id } = req.body
  // book = new Book(book);

  // console.log(req.user);

  // Check if book exists in books collection
    // If book does not exists
      // add it to our books collection
      // add userID to book models 'users' array
    // If so, do nothing, return book id


  // then:

  // Check to see if this book already exists in our db
    // Only real way to know: check agains gbooks_id
      // if there's a book with the same gbooks_id
        // don't add, instead just hold onto that books gbooks id.


  // Add book id to req.users 'books' Array


  // book.save(function (err, savedBook) {
  //   if (err) return console.error(err);
  //   res.send(savedBook)
  // });
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
