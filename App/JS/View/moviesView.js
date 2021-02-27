import {MovieAPI} from '../API/Api.js';
import {movieModel} from '../Model/movieModel.js';
import {playlistView} from '../View/playlistView.js';
let nav = document.querySelector('.nav');
let container = document.querySelector('.mainSection');
let sectionHeader = document.querySelector('.sectionHeader');
class Movie  {
    constructor() {
        
        this.api = MovieAPI;
        this.selectedMovie = null;
        this.currentPage = 'Movies';
        
    }
    init = async() => {
      await this.api.getMovies();
        this.choosePage();

      
    }
    selectMovie = (e) => {
      
    
            let movieID = e.target.closest('.card').dataset.id;
             let selectedMovie = this.api.results[0].filter(movie => movie.id == movieID)[0];
             this.selectedMovie = selectedMovie;
             
           
       
   
    }
    choosePage = (e) => {
        let result = this.showMovies();
        if(e) {
        let item = e.target.closest('.navItem');
       
        if(item) {
            this.currentPage = e.target.dataset.name;
            switch(this.currentPage) {
                case "Movies": 
                    result = this.showMovies();
                    break;
                case "Favourites":
                    result = this.showFavourites();
                    break;
                case "Playlists":
                    result = playlistView.showPlaylists();
                    break;
                case "Stats":
                    console.log("Stats");
            }
        }
    }
        return result;
    }
    showMovieDropdown = async(dropdown) => {
        // movie dropdown for playlist selection
        let playlists = await playlistView.model.getPlaylists();
        let playlistSection = dropdown.children[0].children[1];
        
        
        playlists.data.forEach(playlist => {
            console.log(playlist);
            playlistSection.innerHTML += `<button data-title=${playlist.title} data-id=${playlist._id} class="playlist_select_btn">
            <p class='playlist_title'>${playlist.title}</p>
            </button>`
        })
        
        
    }
    showFavourites = async(movies) => {
        
        let results = await movieModel.getMovies();
        let data = "";
        results.data.forEach(movie => {
            let favouriteMovieCard = this.createMovieCard(movie);
            data += favouriteMovieCard;
        })
        container.innerHTML = data;
        sectionHeader.innerHTML = `<h2 class="sectionTitle">Favourites</h2>`
        this.addMovieBG(container);
       
       
    }
 
    showMovies = () => {
 
        let data = "";

        this.api.results[0].forEach(movie => {
            
            let movieCard = this.createMovieCard(movie);
            data += movieCard
        });
        
 
        container.innerHTML = data;
        sectionHeader.innerHTML = `<h2 class="sectionTitle">Discover</h2>`
        this.addMovieBG(container);
    }
    createMovieCard = (movie) => {
      
        let card = `<div data-title=${movie.title} data-id=${movie.id} class="movieCard card">
                         
        <div data-img=${movie.backdrop_path } class="movieBG">
           <div class="card_nav">
               <i class="far fa-heart"></i>
               <i class="far fa-plus-square"></i>
               <div class="dropdown">
                    <div class="playlistInner">
                        <h2 class='playlistTitle'>Add to Playlist(s)</h2>
                        <div class="playlists">
                        </div>
                    </div>
               </div>
           </div>
        </div>
        <div class="movieText">
           <div class="movieTextHeader">
               <h2 class=' movieTitle'>${movie.title}</h2>
               <p class="vote">${movie.vote_average}</p>
           </div>
           <p class="release_date">${movie.release_date}</p>
         
        </div>
   </div>`;
   return card;
    }
    addMovieBG = (container) => {
 
         let moviesDIV = Array.from(container.children);
        moviesDIV.forEach(div => {
            let bg = div.children[0];
            let imgPath = `https://image.tmdb.org/t/p/w500${bg.dataset.img}`
            bg.style.cssText = `background-image:url(${imgPath});background-size:cover;background-position:center`
        })
    }
}
export let movieView = new Movie();