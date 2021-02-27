import {movieController} from './Controller/movieController.js';
import { movieView } from './View/moviesView.js';
import {playlistModel} from './Model/playlistModel.js';
let container = document.querySelector('.mainSection');
let nav = document.querySelector('.nav');
movieController.init();

container.addEventListener('click',async(e) => {
    let card = e.currentTarget;
    if(e.target.classList.contains('fa-heart')) {
        e.target.classList.remove('far');
        e.target.classList.add('fas');
        
        movieController.view.selectMovie(e);
        movieController.model.addMovie(movieController.view.selectedMovie);
        movieController.model.getMovies();
    }
    if(e.target.classList.contains('fa-plus-square')) {
        console.log('add movie to playlist');
        movieController.view.selectMovie(e);
    
        let dropdown = e.target.parentElement.children[2];
        movieController.view.showMovieDropdown(dropdown);
        dropdown.style.display = 'block';
    }
    let button = e.target.closest('.playlist_select_btn');
    let parent = e.target.closest('.movieCard');  
    if(button) {
        let id = button.dataset.id;
        let movieID = parent.dataset.id;
        let result = await playlistModel.addMovieToPlaylist(id,movieID);
        console.log(result);
    }   
   
})
nav.addEventListener('click',(e) => {
    movieController.view.choosePage(e);
})
console.log('hey world');