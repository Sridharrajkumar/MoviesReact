import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [Movies, setMovies] = useState([])
  
  const [isLoading, setIsLoading] = useState(false);

  const FetchMovieHandler = async() => {
    setIsLoading(true);
    let fetchApi = await fetch("https://swapi.dev/api/films/");
    let ResponseJson = await fetchApi.json();
    setIsLoading(false);
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
        {isLoading ? <h4>Loading...</h4>:<MoviesList movies={Movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
