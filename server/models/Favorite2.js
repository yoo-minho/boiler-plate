const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favorite2Schema = mongoose.Schema({
    userFrom : {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    movieId : {
        type: String
    },
    movieTitle : {
        type: String
    },
    moviePost : {
        type: String
    },
    movieRunTime : {
        type: String
    }
}, {timestamps : true});

const Favorite2 = mongoose.model('Favorite2', favorite2Schema);
module.exports = { Favorite2 }