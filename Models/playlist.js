let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let playlistSchema = new Schema({
    title:String,
    movies:[{movie_id:Number}]

})
module.exports = mongoose.model('playlist',playlistSchema)