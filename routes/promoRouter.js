const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

// Implementing '/promotions' endpoint to be used
promoRouter.route('/')
.get((req, res, next) => {
    Promotions.find({}).then((promotions) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body).then((promotions) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported on /promotions endpoint.' );
})
.delete((req, res, next) => {
    Promotions.deleteMany({}).then((resp) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Implementing '/promotions/promoId' endpoint to be used
promoRouter.route('/:promoId')
.get((req, res, next) => {
    Promotions.findById(req.params.promoId).then((promotion) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation can not be supported on /promotions/' +req.params.promoId);
})
.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    },{ new:true }).then((promotions) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Promotions.findByIdAndDelete(req.params.promoId).then((resp) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Exports
module.exports = promoRouter;