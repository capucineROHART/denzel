import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Movies.css'

const movies = ({ movies }) => {
  return (
  <div class="row">
    {movies.map((movie) => (
        <div class='col-md-4'>
            <div class="container">
                <div class="row flex-column-reverse flex-md-row">
                    <div class="col-md-5">
                        <div class="card">   
                           <div class="card-header">
                              <img class="card-img" src={movie.poster} alt="Card image"/>                              
                           </div>  
                           <div class="card-body">
                           <br></br>
                              <h4 class="card-title">{movie.title}</h4>
                              <div>📽 ID: {movie._id}</div> 
                              <div class="container">
                                 <div class="row">
                                    <div class="col-4 metadata">
                                       <p>⭐ {movie.rating}/10</p>
                                    </div>
                                    <div class="col-4 metadata">🌟 {movie.metascore}</div>   
                                    <div class="col-4 metadata">🖐 {movie.votes}</div>                                      
                                 </div>                     
                              </div>                                                    
                            <p class="card-text">{movie.synopsis}</p>
                            <div class="review">✍ Review({movie.date}): {movie.review}</div> 
                            <a class="trailer-preview" href={movie.link} target="new">
                               ➤
                               </a>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default movies