// importing node modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leader');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

// Implementing '/leaders' endpoint to be used
leaderRouter.route('/')
.get((req, res, next) => {
    Leaders.find({}).then((leaders) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body).then((leaders) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported on /leaders endpoint.' );
})
.delete((req, res, next) => {
    Leaders.deleteMany({}).then((resp) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Implementing '/leaders/leaderId' endpoint to be used
leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    Leaders.findById(req.params.leaderId).then((leader) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation can not be supported on /leaders/' +req.params.leaderId);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    },{ new:true }).then((leaders) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndDelete(req.params.leaderId).then((resp) => {
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Exports
module.exports = leaderRouter;