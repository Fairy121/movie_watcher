let express = require('express');
let app = express();
let cors = require('cors');
let path = require('path');
let PORT = process.env.PORT || 5000;


// Routes
app.use(express.static(path.join(__dirname,"./App")))

app.use(cors({origin:"*"}));
require('dotenv').config();
require('./db.config');

app.use(express.json());

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"./App","index.html"))
})

let movieRoute = require('./Routes/movieRoute');
let playlistRoute = require('./Routes/playlistRoute');


app.use('/api/movie',movieRoute);
app.use('/api/playlist',playlistRoute);

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`);
})