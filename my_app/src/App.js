import React from 'react';
import './App.css';

import axios from 'axios'
handleClick() {
  axios.get('http://localhost:9292/movies')
  .then(response => console.log(response))
}


function App() {
  return (
    <div className="App">
      <header>
        <title>Denzel's movies</title>
          <h1> &#127775;	Denzel Washington &#127775;	</h1>

          <div id="random">
          <p> &#128073; Press the button to get a random must watch movie!</p>
	        <button class="btn" onClick={this.handleClick}>Compute</button>
        </div>

          <div id="specific">
          <p> &#128073; Fetch a specific movie by entering its id!</p>
          <input class="id" type="text" placeholder="Movie ID"/>
	        <button class="btn" >Compute</button>
        </div>

          <div id="search">
          <p> &#128073; Enter the lowest metascore you can accept and the number of movies you want :</p>
          <input class="metascore" type="number" placeholder="Metascore"/>
          <input class="limit" type="number" placeholder="Limit"/> 
          <p>Press the button to acess the list!</p>
	        <button class="btn" >Compute</button>
        </div>

          <div id="save">
          <p> &#128073; Save a review for a movie!</p>
          <input class="date" type="date" placeholder="Review date"/>
          <input class="id" type="text" placeholder="Movie ID"/>
          <input class="review" type="text" placeholder="Review"/>
	        <button class="btn" >Compute</button>
        </div>

        </header>
    </div>
  );
}

export default App;
