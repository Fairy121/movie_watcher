class API {
    constructor() {
        this.results = [];
        this.apiKey = '1f3029ddbc079e7bfd49622d53cf26d7';
    }
  

    getData = async(url) => {
       
        let data = await axios.get(url);
        return data;
    }
    getMovies = async() => {
        let url =  `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`;
        let movies = await this.getData(url);
        this.results.push(movies.data.results);

    }
  
}
export let MovieAPI = new API();