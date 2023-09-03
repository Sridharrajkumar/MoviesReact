import React, { useRef } from 'react'
import classes from './Movieform.module.css'

const Movieform = () => {

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
        
        
        console.log(newMovieObj);
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