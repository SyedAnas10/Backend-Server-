// importing node modules
const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');
const mongoose = require('mongoose');

// importing FavoriteSchema
const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());


// implementing '/favorites' endpoint to be used
favoriteRouter.route('/')
.options(cors.corsWithOptions, (req,res) => { res.sendStatus(200) })
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }).populate(['user','dishes'])
    .then((favorites)=>{
        res.statusCode = 200;
        res.setHeaders = ('Content-Type','application/json');
        res.json(favorites);
    }), (err) =>  next(err) 
    .catch((err) => next(err));
})
.post(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
    .then((favorite) => {
        if(favorite){   // if a user is already present in db
            for (var i=0; i<req.body.length; i++) {
                if (favorite.dishes.indexOf(req.body[i]._id) === -1) { // only adds the dishes which are not yet present in the list
                    favorite.dishes.push(req.body[i]._id);
                }
            }
            favorite.save()
            .then((favorites) =>{
                console.log('Favorite Created ', favorites);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }), (err) => next(err);
        }
        else{ // if not present, create a new list for this user
            Favorites.create({user : req.user._id, dishes : req.body})
            .then((favorite) => {
                console.log('Favorite Created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }), (err) => next(err);
        }
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndRemove({ user : req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }),(err) => next(err)
    .catch((err) => next(err));
});

// implementing 'favorites/:dishId' endpoints to be used
favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req,res)=>{ sendStatus = 200 })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
        if (!favorites) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists": false, "favorites": favorites});
        }
        else {
            if (favorites.dishes.indexOf(req.params.dishId) < 0) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": false, "favorites": favorites});
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": true, "favorites": favorites});
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id})
    .then((favorite) => {
        if(favorite){
            if (favorite.dishes.indexOf(req.params.dishId) === -1) {
                favorite.dishes.push(req.params.dishId);
            }
        }
        else{
            Favorites.create({ user: req.user._id, dishes : req.params.dishId})
            .then((favorite) => {
                console.log('Favorite Created ', favorite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }), (err) => next(err)
            .catch((err) => next(err));
        }
    }), (err) => next(err)
    .catch((err) => next(err));
})
.put(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/' +req.params.dishId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=> {
    Favorites.findOne({ user: req.user._id })
    .then((favorite) => {
        if(favorite){ // find index of this dish if present in db, so that it can be removed
            index = favorite.dishes.indexOf(req.params.dishId); 
            if( index >= 0){
                favorite.dishes.splice(index, 1);
                favorite.save()
                .then((favorite) => {
                    console.log('Favorite Deleted ', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                },(err) => next(err));
            }
            else{
                err = new Error('Dish ' + req.params.dishId + ' not found in favorites');
                err.status = 404;
                return next(err);
            }
        }
        else{
            err = new Error('Favorites not found');
            err.status = 404;
            return next(err);
        }
    }), (err) => next(err)
    .catch((err) => next(err));
})


// exports
module.exports = favoriteRouter;


