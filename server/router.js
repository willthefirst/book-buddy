const AuthenticationController = require('./controllers/authentication'),
      BooksController = require('./controllers/books'),
      express = require('express'),
      passportService = require('./config/passport'),
      passport = require('passport');


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


// (this.req, this.res, this.next);

module.exports = function(app) {


  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route /api/auth/register
  authRoutes.post('/register', AuthenticationController.register);

  // Login route /api/auth/login
  authRoutes.post('/login', AuthenticationController.login);

  // Set url for API group routes
  app.use('/api', apiRoutes);

  //=========================
  // API Routes
  //=========================

  // '/api/books/'

  // Get all user books
  apiRoutes.get('/books', BooksController.getAllBooks)

  // Create book route
  apiRoutes.post('/books', BooksController.createBook)

  // '/api/books/:id'

  // Single book route
  apiRoutes.get('/book/:id', BooksController.getBook)

  // PUT: update the current book
  apiRoutes.put('/book/:id', BooksController.updateBook)

  // DELETE: get the current book
  apiRoutes.delete('/book/:id', BooksController.deleteBook)
};
