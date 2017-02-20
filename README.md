# Book buddy

## To run

`yarn start `

or for the server to use nodemon:
`npm run dev`

## /server

Followed this tutorial during initial setup: http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/

## Common errrors

`There is another module with an equal name when case is ignored.
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
Rename module if multiple modules are expected or use equal casing if one module is expected.`

Fix: check directory paths for case differences
