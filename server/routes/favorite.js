const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//===========================
//          Favorite
//===========================

router.post('/getFavoriteNumber', (req, res) => {

    Favorite.find({"movieId":req.body.movieId})
    .exec((err, favorites) => {
        if(err) return res.status(400).json({success:false, err})
        res.status(200).json({success:true, favoriteNumber : favorites.length});
    })

});

router.post('/favorited', (req, res) => {

    Favorite.find({"movieId":req.body.movieId, "userFrom":req.body.userFrom})
    .exec((err, favorites) => {
        if(err) return res.status(400).json({success:false, err})
        let result = favorites.length !== 0 ? true : false;
        res.status(200).json({success:true, favorited : result});
    })

});

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).json({success:false, err})
        res.status(200).json({success:true, doc});
    })

});

router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if(err) return res.status(400).json({success:false, err})
        res.status(200).json({success:true, doc});
    })

});

router.post('/getFavoriteMovies', (req, res) => {

    Favorite.find({userFrom:req.body.userFrom})
    .exec((err, favotitedMovies) => {
        if(err) return res.status(400).json({success:false, err})
        res.status(200).json({success:true, favotitedMovies});
    })

});

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom})
    .exec((err, result) => {
        if(err) return res.status(400).json({success:false, err})
        res.status(200).json({success:true, result});
    })

});







module.exports = router; 