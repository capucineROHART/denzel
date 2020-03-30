const axios = require('axios');
const cheerio = require('cheerio');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const {IMDB_NAME_URL, IMDB_URL, P_LIMIT} = require('./constants');
const {MongoClient} = require('mongodb');
const uri = "mongodb://CRohart:capu@cluster0-shard-00-00-lygtr.mongodb.net:27017,cluster0-shard-00-01-lygtr.mongodb.net:27017,cluster0-shard-00-02-lygtr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology: true });

const getFilmography = async actor => {
  try {
    const response = await axios(`${IMDB_NAME_URL}/${actor}`);
    const {data} = response;
    const $ = cheerio.load(data);

    return $('#filmo-head-actor + .filmo-category-section .filmo-row b a')
      .map((i, element) => {
        return {
          'link': `${IMDB_URL}${$(element).attr('href')}`,
          'title': $(element).text()
        };
      })
      .get();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getMovie = async link => {
  try {
    const response = await axios(link);
    const {data} = response;
    const $ = cheerio.load(data);

    return {
      link,
      'id': $('meta[property="pageId"]').attr('content'),
      'metascore': Number($('.metacriticScore span').text()),
      'poster': $('.poster img').attr('src'),
      'rating': Number($('span[itemprop="ratingValue"]').text()),
      'synopsis': $('.summary_text')
        .text()
        .trim(),
      'title': $('.title_wrapper h1')
        .text()
        .trim(),
      'votes': Number(
        $('span[itemprop="ratingCount"]')
          .text()
          .replace(',', '.')
      ),
      'year': Number($('#titleYear a').text())
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};

async function populateDatabase(movies){
  try {
        await client.connect();
        await client.db("IMdb").collection("DenzelMovies").drop();
        await createListing(movies);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createListing(movies){
	console.log(JSON.stringify(movies, null, 2));
    const result = await client.db("IMdb").collection("DenzelMovies").insertMany(movies);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

//Function for FIRST Endpoint
module.exports.populate = async actor => {
	const limit = pLimit(P_LIMIT);
  	const filmography = await getFilmography(actor);

  	const promises = filmography.map(filmo => {
    	return limit(async () => {
      		return await getMovie(filmo.link);
    	});
  	});

  	const results = await pSettle(promises);
  	const isFulfilled = results
    	.filter(result => result.isFulfilled)
    	.map(result => result.value);

  	const movies= [].concat.apply([], isFulfilled);
  	const populate = await populateDatabase(movies);
  	return movies;
};

//Function for SECOND Endpoint
module.exports.mustwatch = async () => {
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

//Function for THIRD Endpoint
module.exports.specificmovie = async movie => {
    try {
        await client.connect();
        const specific = await client.db("IMdb").collection("DenzelMovies").findOne({id:movie});
        return specific
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

//Function for FOURTH Endpoint
module.exports.searchmovie = async (metascore, limit) => {
    try {
        await client.connect();
        const movies = await client.db("IMdb").collection("DenzelMovies")
        .find({metascore:{ $gte: metascore }})
        .sort({ metascore: -1 })
        .toArray();
        console.log(movies.length);
        if(movies.length>=limit) {
        	result=[];
        	for (let i = 0; i < limit; i++) {
        		result[i]=movies[i];
				}
			return [movies.length, result]
		}
		else
			return [movies.length, movies]
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

//Function for FIFTH Endpoint
module.exports.savedateandreview = async (movie, date, review) => {
    try {
        await client.connect();
        const newmovie = await client.db("IMdb").collection("DenzelMovies")
		.findOneAndUpdate({movie}, {$push: {date: date, review: review} }, {returnNewDocument: true });
        const modified_movie = await client.db("IMdb").collection("DenzelMovies").findOne({id:movie});
        return modified_movie
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};