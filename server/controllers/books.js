const Book = require('../models/user')

// Get all the books
exports.getAllBooks = function(req, res) {
  Book.find(function (err, books) {
    if (err) return console.error(err);
    res.send(books);
  })
}

// Add a new book
exports.createBook = function(req, res) {
  const book = {
    title: req.body.title,
    author: req.body.author,
    totalPages: req.body.totalPages,
    status: req.body.status
  }
  var sample = new Book(book);

  sample.save(function (err, book) {
    if (err) return console.error(err);
    res.send(book)
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
