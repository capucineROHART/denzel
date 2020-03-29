const axios = require('axios');
const cheerio = require('cheerio');
const {IMDB_NAME_URL, IMDB_URL, P_LIMIT} = require('./constants');
const {MongoClient} = require('mongodb');
const uri = "mongodb://CRohart:capu@cluster0-shard-00-00-lygtr.mongodb.net:27017,cluster0-shard-00-01-lygtr.mongodb.net:27017,cluster0-shard-00-02-lygtr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology: true });

module.exports = async (movie, date, review) => {
    try {
        await client.connect();
        const newmovie = await client.db("IMdb").collection("DenzelMovies")
        //.findOneAndUpdate({movie},{ $set: { review_date: date, review: review }});
        .findOneAndUpdate({ movie }, { $push: { reviews: { date, review } } });
        const modified_movie = await client.db("IMdb").collection("DenzelMovies").findOne({id:movie});
        return modified_movie
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};
