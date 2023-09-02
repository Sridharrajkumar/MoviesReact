import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const[Movies,setMovies]=useState([])

  const FetchMovieHandler = async() => {
    
    let fetchApi = await fetch("https://swapi.dev/api/films/");
    let ResponseJson = await fetchApi.json();
    let movie = ResponseJson.results.map((res) => {
      return {
        id:res.episode_id,
        title:res.title,
        releaseDate:res.release_date,
        openingText:res.opening_crawl
      }
    })

    setMovies(movie);
  }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={Movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
