const axios = require('axios');
const cheerio = require('cheerio');
const {IMDB_NAME_URL, IMDB_URL, P_LIMIT} = require('./constants');
const {MongoClient} = require('mongodb');
const uri = "mongodb://CRohart:capu@cluster0-shard-00-00-lygtr.mongodb.net:27017,cluster0-shard-00-01-lygtr.mongodb.net:27017,cluster0-shard-00-02-lygtr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology: true });

module.exports = async () => {
    try {
        await client.connect();
        const movies = await client.db("IMdb").collection("DenzelMovies").find().toArray();
        const awesome = movies.filter(movie => movie.metascore >= 70);
        if (awesome.length > 0){
            return awesome[Math.floor(Math.random()*awesome.length)];}
        else 
            console.log("No awesome movie found with a metascore over 70 !");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};