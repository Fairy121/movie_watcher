import {movieView} from '../View/moviesView.js';
import {movieModel} from '../Model/movieModel.js';
class Controller {
    constructor(model,view) {
        this.model = model;
        this.view = view;
    }
    init = () => {
      
        this.view.init();
     
        
        
    }
}
export let movieController = new Controller(movieModel,movieView);