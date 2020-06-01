const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//===========================
//          Like
//===========================

router.post('/getLikes', (req, res) => {

    let variable = {}
    if(req.body.videoId){
        variable = { videoId : req.body.videoId}
    } else {
        variable = { commentId : req.body.commentId}
    }

    Like.find(variable)
    .exec((err, likes) => {
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true, likes});
    })

});

router.post('/getDislikes', (req, res) => {

    let variable = {}
    if(req.body.videoId){
        variable = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        variable = { commentId : req.body.commentId, userId : req.body.userId}
    }

    Dislike.find(variable)
    .exec((err, dislikes) => {
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true, dislikes});
    })

});

router.post('/upLike', (req, res) => {

    let variable = {}
    if(req.body.videoId){
        variable = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        variable = { commentId : req.body.commentId, userId : req.body.userId}
    }

    //Like collection 클릭 정보를 넣어주기
    const like = new Like(variable);
    like.save((err) => {
        if(err) return res.json({success:false,err})
    })

    //만약 Dislike 되어있다면 빼주기
    Dislike.findOneAndDelete(variable)
    .exec((err) => {
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })

});

router.post('/unLike', (req, res) => {

    let variable = {}
    if(req.body.videoId){
        variable = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        variable = { commentId : req.body.commentId, userId : req.body.userId}
    }

    //만약 Dislike 되어있다면 빼주기
    Like.findOneAndDelete(variable)
    .exec((err) => {
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })

});

router.post('/unDislike', (req, res) => {

    let variable = {}
    if(req.body.videoId){
        variable = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        variable = { commentId : req.body.commentId, userId : req.body.userId}
    }

    //만약 Dislike 되어있다면 빼주기
    Dislike.findOneAndDelete(variable)
    .exec((err) => {
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })

});


router.post('/upDislike', (req, res) => {

    let variable = {}
    if(req.body.videoId){
        variable = { videoId : req.body.videoId, userId : req.body.userId }
    } else {
        variable = { commentId : req.body.commentId, userId : req.body.userId}
    }

    //Disike collection 클릭 정보를 넣어주기
    const dislike = new Dislike(variable);
    dislike.save((err) => {
        if(err) return res.json({success:false,err})
    })

    //만약 Like 되어있다면 빼주기
    Like.findOneAndDelete(variable)
    .exec((err) => {
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })

});



module.exports = router; 