const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
// Implementing '/promotions' endpoint to be used
promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotion ' +req.body.name+ ' in the list.\nDescription : ' +req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation is not supported on /promotions endpoint.' );
})
.delete((req, res, next) => {
    res.end('Deleting all the promotions!');
});
// Implementing '/promotions/promoId' endpoint to be used
promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will get you the detail of promo with id : ' +req.params.promoId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation can not be supported on /promotions/' +req.params.promoId);
})
.put((req, res, next) => {
    res.end('Updating the promo with id : ' +req.params.promoId);
})
.delete((req, res, next) => {
    res.end('Deleting promo ' +req.params.promoId+ ' and updating the list');
});

// Exports
module.exports = promoRouter;