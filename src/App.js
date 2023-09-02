import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [Movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  let retryTimeout 
  
 
  const FetchMovieHandler = useCallback( async() => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      let fetchApi = await fetch("https://swapi.dev/api/films/");
      if(!fetchApi.ok) throw new Error("Something Went Wrong....");
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
    catch (error)
    {
      setIsError(error.message)
      console.log(1);
      
    }
    setIsLoading(false);
  },[])

  useEffect(() => {
    if (isError)
    {
      retryTimeout =setTimeout(() => {
        FetchMovieHandler();
        console.log("set");
      }, 5000);
    }
    
  }, [isError])
  
  useEffect(() => {
    FetchMovieHandler();
  },[FetchMovieHandler])
  
  
  
  const HandleRetring = () => {
    clearTimeout(retryTimeout);
    setIsError(false);
  };

  
  

  return (
    <React.Fragment>
      <section >
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
        {isError && <button onClick={HandleRetring}>Cancel</button>}
      </section>
      <section>
        {!isLoading && Movies.length === 0 && !Error  && <p>Found No Movies</p>}
        {!isLoading && Movies.length > 0 && <MoviesList movies={Movies} />}
        {isLoading && <h4>Loading...</h4>}
        {!isLoading && isError && <p>{isError}</p>}
        
      </section>
    </React.Fragment>
  );
}

export default App;



