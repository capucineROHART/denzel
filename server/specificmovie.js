const axios = require('axios');
const cheerio = require('cheerio');
const {IMDB_NAME_URL, IMDB_URL, P_LIMIT} = require('./constants');
const {MongoClient} = require('mongodb');
const uri = "mongodb://CRohart:capu@cluster0-shard-00-00-lygtr.mongodb.net:27017,cluster0-shard-00-01-lygtr.mongodb.net:27017,cluster0-shard-00-02-lygtr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology: true });

module.exports = async movie => {
    try {
        await client.connect();
        const specific = await client.db("IMdb").collection("DenzelMovies").findOne({movie});
        console.log(specific);
        return specific
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};
