let router = require('express').Router();
let movieModel = require('../Models/movie');

router.get('/',(req,res) => {
  
    movieModel.find({},(err,data) => {
        if(err) {
            res.status(500).json({msg:"Cant find collection",err})
        } else {
            res.send(data);
        }
    })
})

router.post('/',(req,res) => {
    const {title,backdrop_path,release_date,vote_average,favourite} = req.body;
    let newMovie = new movieModel({title,backdrop_path,release_date,vote_average,favourite});
    newMovie.save((err,movie) => {
        console.log(req.body);
        if(err) {
            res.status(500).json({msg:err.response})
        } else {
            res.status(200).json({msg:'Added Image to Collection',movie})
        }
    })
})

router.delete('/:id',(req,res) => {
    let id = req.params.id;
    imageModel.findByIdAndDelete({_id:id},(err,movie) => {
        if(err) {
            res.status(500).json({msg:err})
        } else {
            res.status(200).json({msg:'Deleted Image from Collection',movie})
        }
    })
})
router.post('/test',(req,res) => {
    let title = req.body.title;
    res.send(title);
})

module.exports = router;