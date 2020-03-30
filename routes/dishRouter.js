// Importing Node Modules here
const express = require('express');
const bodyParser = require('body-parser');

 
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
// Implementing '/dishes' endpoint to be used
dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish ' +req.body.name+ ' in the list.\nDescription : ' +req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported on /dishes endpoint.' );
})
.delete((req, res, next) => {
    res.end('Deleting all the dishes!');
});
// Implementing '/dishes/:dishId' endpoint to be used
dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will get you the detail of dish with id : ' +req.params.dishId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation can not be supported on /dishes/' +req.params.dishId);
})
.put((req, res, next) => {
    res.end('Updating the dish with id : ' +req.params.dishId);
})
.delete((req, res, next) => {
    res.end('Deleting dish ' +req.params.dishId+ ' and updating the list');
});

// Exports
module.exports = dishRouter;
