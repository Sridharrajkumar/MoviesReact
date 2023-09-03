import React, { useRef } from 'react'
import classes from './Movieform.module.css'

const Movieform = (props) => {

    const titleRef = useRef();
    const openingtextRef = useRef();
    const releasedataRef=useRef();
    

    const submitHandler = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const openingtext = openingtextRef.current.value;
        const releasedate = releasedataRef.current.value;

        const newMovieObj = {
            title: title,
            openingText:openingtext,
            releaseDate:releasedate,
        };
        props.OnAddMovie(newMovieObj);
        titleRef.current.value = null;
        openingtextRef.current.value = null;
        releasedataRef.current.value = null;
    }
    


  return (
      <form className={classes.form} onSubmit={submitHandler}>
          <label>Title</label>
          <input type="text" ref={titleRef} required></input>
          <label>Opening Text</label>
          <textarea rows={5} ref={openingtextRef} required></textarea>
          <label>Release Date</label>
          <input type='date'ref={releasedataRef} required></input>
          <button className={classes.btn}>Add Movie</button>
    </form>
  )
}

export default Movieform