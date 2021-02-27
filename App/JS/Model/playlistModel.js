import {MovieAPI} from '../API/Api.js';

class PlaylistModel {
    constructor() {
        this.url = `https://movie-watcher-project.herokuapp.com/api/playlist`
    }
    getPlaylists = async() => {
        let playlists = await axios.get(this.url);
        return playlists;
    }
    addPlaylist = async(title) => {
       let newPlaylist = await axios.post(this.url,{title});
       console.log(newPlaylist);
       return newPlaylist;
    }
    addMovieToPlaylist = async(id,movieID) => {
        let addMovie = await axios.post(`${this.url}/${id}/${movieID}`);
        console.log(addMovie);
    }
    deletePlaylist = () => {

    }
    getFormData = () => {

    }
}

export let playlistModel = new PlaylistModel();