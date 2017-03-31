# Book buddy

## To run

`yarn start `

or for the server to use nodemon:
`nodemon`

## /server

Followed this tutorial during initial setup: http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/

## How-tos

To make a route require auth, add it as a child route to `src/routes/EnsureLoggedIn/index.js`

## Common errrors

`There is another module with an equal name when case is ignored.
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
Rename module if multiple modules are expected or use equal casing if one module is expected.`

Fix: check directory paths for case differences
