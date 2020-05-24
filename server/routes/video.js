const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
//const { auth } = require('./middleware/auth');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "upload_files/"); 
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb)=>{
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4'){
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({storage:storage}).single("file");

//===========================
//          Video
//===========================

router.post('/uploadfiles', (req, res) => {
    
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })

});

router.post('/uploadvideo', (req, res) => {
    
    const video = new Video(req.body);

    video.save((err, doc) => {
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true})
    })

});

//비디오를 디비에서 가져와서 클라이언트에 전달한다.
router.get('/getVideos', (req, res) => {
    
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, videos})
        })

});

router.post('/getVideoDetail', (req, res) => {
    
    Video.findOne({"_id":req.body.videoId})
        .populate('writer')
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, videoDetail})
        })

});

router.post('/thumbnail', (req, res) => {

    let filePath = "";
    let fileDuration = "";

    //비디오정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })
    
    //썸네일 생성하기
    ffmpeg(req.body.url)
    .on('filenames', function (filenames){
        console.log('Will generate ' + filenames.join(', '));
        console.log('filenames');
        filePath = "upload_files/thumbnails/" + filenames[0];
    })
    .on('end', function(){
        console.log('Screenshots taken');
        return res.json({success:true, url:filePath, fileDuration:fileDuration})
    })
    .on('error', function(err){
        console.error(err);
        return res.json({success:false, err})
    })
    .screenshots({
        count:3,
        folder: "upload_files/thumbnails/",
        size:'320x240',
        filename: 'thumbnail-%b.png'
    })

});

module.exports = router; 