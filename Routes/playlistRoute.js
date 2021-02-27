let router = require('express').Router();
let playlistModel = require('../Models/playlist');


router.get('/',(req,res) => {
    playlistModel.find({},(err,data) => {
        if(err) {
            res.status(500).json({msg:"Cant find playlist collection",err})
        } else {
            res.send(data);
        }
    })
})

router.post('/',(req,res) => {
    let title = req.body.title;
    let newPlaylist = new playlistModel({title});
    newPlaylist.save((err,movie) => {
            if(err) {
                res.status(500).json({msg:err.response})
            } else {
                res.status(200).json({msg:'Added Playlist',movie})
            }
    })
})

router.post('/:id/:movieID',(req,res) => {
    let id = req.params.id;
    let movieID = req.params.movieID;
    let title = req.body.title;
 

    playlistModel.findById({_id:id},(err,data) => {
        if(err) {
            res.status(500).json({msg:"Playlist does not exist",err})
        } else {
            if(data) {
             
                data.movies.push({movie_id:movieID});
                data.save((err,playlist) => {
                    if(err) {
                        res.status(500).json({msg:"Playlist does not exist",err})
                    } else {
                        res.status(200).json({msg:'Added movie to playlist',playlist})
                    }
                })
            } else {
                let newPlaylist = new playlistModel({title});
                newPlaylist.movies.push({movie_id:id});
                newPlaylist.save((err,movie) => {
                        if(err) {
                            res.status(500).json({msg:err.response})
                        } else {
                            res.status(200).json({msg:'Added Playlist',movie})
                        }
                })

            }
        }
    })
    
  
  
})

module.exports = router;