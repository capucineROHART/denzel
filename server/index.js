const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {PORT} = require('./constants');
const imdb = require("./imdb");

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());


app.get("/", (request, response) => {
	response.send({ ack: true });
});

//FIRST Endpoint: Populate the database
app.get("/movies/populate/:id", async (request, response) => {
	const actor_id = request.params.id;
	const populate_movies = await imdb.populate(actor_id);
	response.send({ total: populate_movies.length });
});

//SECOND Endpoint: Fetch a random must-watch movie
app.get("/movies", async (request, response) => {
	const mustWatch_movie = await imdb.mustwatch();
    response.send(mustWatch_movie);
});

//FOURTH Endpoint: Search for Denzel's movies
app.get("/movies/search", async (request, response) => {
	var limit = parseInt(request.query.limit);
	var metascore = parseInt(request.query.metascore);
	if(!metascore)
		metascore=0;
	if(!limit)
		limit=5;
	const movies = await imdb.searchmovie(metascore, limit);
	response.send({ limit: limit, total: movies[0], results: movies[1] });
});

//THIRD Endpoint: Fetch a specific movie
app.get("/movies/:id", async (request, response) => {
	const movie_id = request.params.id;
	const specific = await imdb.specificmovie(movie_id);
	response.send(specific);
});

//FIFTH Endpoint: Save a watched date and a review
app.post("/movies/:id", async (request, response) => {
	const movie_id = request.params.id;
	const {date, review} = request.body;
	if(! {date, review})
		response.send("You need to specify a date and a review!");
	const movie = await imdb.savedateandreview(movie_id, date, review);
	console.log(movie);
	response.send({ _id: movie._id });
});

app.listen(PORT, async () =>  {
    console.log(`📡 Running on port ${PORT}`)   
})
