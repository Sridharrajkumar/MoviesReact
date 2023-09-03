import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Movieform from './components/Movieform';

function App() {

  const [Movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null); 
  
 
  const FetchMovieHandler = useCallback( async() => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      let fetchApi = await fetch("https://moviereact-47-default-rtdb.firebaseio.com/movies.json");
      if(!fetchApi.ok) throw new Error("Something Went Wrong....");
      let ResponseJson = await fetchApi.json();

      const loadMovie = [];
      for (const key in ResponseJson) {
        loadMovie.push({
          id: key,
          title: ResponseJson[key].title,
          releaseDate: ResponseJson[key].releaseDate,
          openingText: ResponseJson[key].openingText
       
        });
      }
      
      setMovies(loadMovie);
    }
    catch (error)
    {
      setIsError(error.message) 
    }
    setIsLoading(false);
  },[])
  
  useEffect(() => {
    FetchMovieHandler();
  }, [FetchMovieHandler])
  
  const addMovieHandler = async(movie)=>{
    await fetch("https://moviereact-47-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type':"application/json",
      }
    });
    
  }

  const DeleteMovieHandler = async(id) => {
    await fetch(`https://moviereact-47-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: "DELETE",
      headers:{'Content-type':'application/json'}

    });

    FetchMovieHandler();
  }
  

  return (
    <React.Fragment>
      <section>
        <Movieform OnAddMovie={addMovieHandler} />
      </section>
      <section >
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && Movies.length === 0 && !Error  && <p>Found No Movies</p>}
        {!isLoading && Movies.length > 0 && <MoviesList movies={Movies} onDelete={DeleteMovieHandler} />}
        {isLoading && <h4>Loading...</h4>}
        {!isLoading && isError && <p>{isError}</p>}
        
      </section>
    </React.Fragment>
  );
}

export default App;



