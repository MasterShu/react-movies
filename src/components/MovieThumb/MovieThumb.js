import React from 'react'
import './MovieThumb.css'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const MovieThumb = ({clickable, movieId, movieName, image}) => {
  return(
    <div className="rmdb-moviethumb">
      { clickable ?
        <Link to={{pathname: `/${movieId}`, movieName: `${movieName}`}}>
          <img src={image} alt=""/>
        </Link>
        :
        <img src={image} alt="" />
        
      }
    </div>
  )
};

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
  clickable: PropTypes.bool
};

export default MovieThumb
