

let sectionHeader = document.querySelector('.sectionHeader');
let container = document.querySelector('.mainSection');
import {MovieAPI} from '../API/Api.js';
import {playlistModel} from '../Model/playlistModel.js';
class Playlist {
    constructor() {
        this.form = null;
        this.model = playlistModel;
        this.api = MovieAPI;
        
    }
    
    showPlaylists = async() => {
        sectionHeader.innerHTML = `
        <h2 class="sectionTitle">My Playlists</h2>
        <button class="btn playlistBtn">New Playlist</button>
       
       `

       this.createPlayList();
       this.getFormData();
       this.playlist();
    }
    createPlayList = () => {
        let playlistBtn = sectionHeader.children[1];
        playlistBtn.addEventListener('click',() => {
            this.playlistModal();
            this.getFormData();
        })
    }
    playlist = async() => {
        let playlists = await this.model.getPlaylists();
        let results = "";
        
        playlists.data.forEach((playlist) => {
            let test = this.showPlaylistMovies(playlist);
       
            results  += `
                <div class="playlist">
                    <div class="playlistHeader">
                        <div>
                            <h2 class='playlistTitle'>${playlist.title}</h2>
                            <p class='moviesLength'>${playlist.movies.length} movies</p>
                        </div>
                        <p class='dropdown_angle'>
                            <i class="fas fa-angle-down"></i>
                        </p>
                    </div>
                    ${test}
                    
                </div>
            `

        })
       
        container.innerHTML = results;
      
    }
    showPlaylistMovies = (playlist) => {

         
        let result = "";
    
        playlist.movies.forEach(movie => {
           let filterMovies = this.api.results[0].filter(result => result.id == movie.movie_id);
           console.log(filterMovies);
           filterMovies.forEach((filter,index) => {
               console.log(index);
            result += `<div class='playlist_movie'>
            
            <p class="playlistTitle"> ${filter.title}</p>
        </div>`;
           })
    
    
        })
        return result;
        
 
      
    }
    playlistModal = () => {
        let modal = document.createElement('DIV');
        let form = document.createElement('form');
        form.classList.add('playlistForm');
        modal.appendChild(form);
        modal.classList.add('modal');
        form.innerHTML = `
            <h2 class='modalTitle'>Create Playlist</h2>
            <label class='playlistLabel' for='title'>Playlist Title</label>
            <input name='title' class='input title' placeholder="Ex. My First Playlist"></input>
            <label class='playlistLabel' for='desc'>Playlist Description</label>
            <input name='desc' class='input desc' placeholder="Ex. These are the first songs I ever listened to"></input>
            <button class='btn createPlaylistBtn'>Submit</button>
       `
        this.form = form;
        
        container.appendChild(modal);
    }
    getFormData = () => {
       if(this.form) {
           this.form.addEventListener('submit',async(e) => {
               e.preventDefault();
               let title = this.form['title'].value;
               if(title !== "") {
                    let result = await this.model.addPlaylist(title);
                    console.log(result);
               }
               let modal = container.childNodes[1];
               container.removeChild(modal);
              
           })
       }
    }
}
export let playlistView = new Playlist();