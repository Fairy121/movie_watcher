// movie model for users own personal collection
import {MovieAPI} from '../API/Api.js';

class Model {
    constructor() {
        this.selectedMovie = null;
        this.movies = [];
        this.api = MovieAPI;
    }
    getMovies = async() => {
       let movies = await MovieAPI.getData('http://localhost:5000/api/movie');
       this.movies.push(movies);
       return movies;
    }
    addMovie = async(movie) => {
        let addedMovies = await this.getMovies();
        
        console.log(addedMovies.data[0].title);
        console.log(movie);
        if(addedMovies.data[0].title == movie.title) {
            console.log('already added!');
        } else {
            if(movie) {
                let {title,release_date,vote_average,backdrop_path} = movie;
                console.log(movie);
                let movieData = {
                    title:title,
                    release_date:release_date,
                    vote_average:vote_average,
                    backdrop_path:backdrop_path,
                    favourite:true
                }
            let newMovie = await axios.post('http://localhost:5000/api/movie',movieData);
                console.log(newMovie);
            }
        }
    }
}
export let movieModel = new Model();
