const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express()

// Apply gzip compression
app.use(compress())

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodie

// Database
mongoose.connect('mongodb://127.0.0.1/book-buddy');
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to database');
});

// Models and Schemas

var bookSchema = mongoose.Schema({
    title: { type: String, default: 'Title' },
    author: { type: String, default: 'Author' },
    status: { type: String, default: 'Current' },
    totalPages: { type: Number, default: 42 }
});

const Book = mongoose.model('Book', bookSchema)

// Routes

// '/api/books/'

// GET: get all the books
app.get('/api/books', function(req, res) {
  Book.find(function (err, books) {
    if (err) return console.error(err);
    res.send(books);
  })
});

// POST: add a new book
app.post('/api/books', function(req, res) {
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
});

// '/api/books/:id'

// GET: delete the current book
app.get('/api/book/:id', function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if (err) return console.error(err);
    res.send(book);
  })
});

// PUT: update the current book
app.put('/api/book/:id', function(req, res) {

  const update = {
    title: req.body.title,
    author: req.body.author,
    totalPages: req.body.totalPages,
    status: req.body.status
  }

  Book.findByIdAndUpdate(req.body._id, { $set: update}, { new: true }, function (err, book) {
    if (err) return console.error(err);
    res.send(book);
  });
});

// DELETE: get the current book
app.delete('/api/book/:id', function(req, res) {
  Book.findByIdAndRemove(req.params.id, function (err, deletedBook) {
    if (err) return console.error(err);
    res.send(deletedBook);
  });
});

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

module.exports = app
