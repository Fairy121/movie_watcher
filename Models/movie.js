let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let movieSchema = new Schema({
    id:mongoose.Schema.Types.ObjectId,
    
    title:String,
    backdrop_path:String,
    release_date:String,
    vote_average:Number,
    favourite:{type:Boolean,default:false}
})

let movie = new mongoose.model('movie',movieSchema);
module.exports = movie;