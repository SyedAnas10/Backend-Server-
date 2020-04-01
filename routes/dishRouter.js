// Importing Node Modules here
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// Implementing '/dishes' endpoint to be used
dishRouter.route('/')
.get((req, res, next) => {
    Dishes.find({}).then((dishes) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Dishes.create(req.body).then((dish) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported on /dishes endpoint.' );
})
.delete((req, res, next) => {
    Dishes.deleteMany({}).then((resp) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
});
// Implementing '/dishes/:dishId' endpoint to be used
dishRouter.route('/:dishId')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId).then((dish) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation can not be supported on /dishes/' +req.params.dishId);
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new : true}).then((dish) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId).then((resp) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Exports
module.exports = dishRouter;
