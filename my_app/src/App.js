import React from 'react';
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route,
  Link} from "react-router-dom";

import RandomMustWatch from './RandomMustWatch';
import SpecificMovie from './SpecificMovie';
import SearchMovie from './SearchMovie';
import SaveReview from './SaveReview';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <title>Denzel's movies</title>
            <h1> &#127775;	Denzel Washington &#127775;	</h1>

            <div id="random">
            <p> &#128073; Press the button to get a random must watch movie!</p>
            <Link to="/movies"><button id="btn">Compute</button></Link>
          </div>

            <div id="specific">
            <p> &#128073; Fetch a specific movie by entering its id!</p>
            <input class="id" type="text" placeholder="Movie ID"/>
            <Link to="/movies/tt10095582"><button id="btn">Compute</button></Link>
          </div>

            <div id="search">
            <p> &#128073; Enter the lowest metascore you can accept and the number of movies you want :</p>
            <input class="metascore" type="number" placeholder="Metascore"/>
            <input class="limit" type="number" placeholder="Limit"/> 
            <p>Press the button to acess the list!</p>
            <Link to="/movies/search?limit=5&metascore=77"><button id="btn">Compute</button></Link>
          </div>

            <div id="save">
            <p> &#128073; Save a review for a movie!</p>
            <input class="date" type="date" placeholder="Review date"/>
            <input class="id" type="text" placeholder="Movie ID"/>
            <input class="review" type="text" placeholder="Review"/>
            <Link to="/movies/tt0328107"><button id="btn">Compute</button></Link>
          </div>

          </header>
      </div>
    
      <Switch>
        <Route path="/movies" component={RandomMustWatch}/>
        <Route path="/movies/:id" component={SpecificMovie}/>           
        <Route path="/movies/search?limit=5&metascore=77" component={SearchMovie}/>
        <Route path="/movies/:id" component={SaveReview}/>          
      </Switch>

    </Router>
  );
}