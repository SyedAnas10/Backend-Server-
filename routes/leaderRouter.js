const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
// Implementing '/leaders' endpoint to be used
leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the leader ' +req.body.name+ ' in the list.\nDescription : ' +req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported on /leaders endpoint.' );
})
.delete((req, res, next) => {
    res.end('Deleting all the leaders!');
});
// Implementing '/leaders/leaderId' endpoint to be used
leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will get you the detail of leader with id : ' +req.params.leaderId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation can not be supported on /leaders/' +req.params.leaderId);
})
.put((req, res, next) => {
    res.end('Updating the leader with id : ' +req.params.leaderId);
})
.delete((req, res, next) => {
    res.end('Deleting leader ' +req.params.leaderId+ ' and updating the list');
});

// Exports
module.exports = leaderRouter;