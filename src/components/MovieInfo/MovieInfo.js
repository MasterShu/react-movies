import React from 'react'
import './MovieInfo.css'
import FontAwesome from 'react-fontawesome'
import {BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "../../config";
import MovieThumb from "../MovieThumb/MovieThumb";
import PropTypes from "prop-types";

const MovieInfo = ({movie, directors}) => {
  return (
    <div className="rmdb-movieinfo"
         style={{
           background: movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}/${movie.backdrop_path}')`: '#000'
         }}
    >
      <div className="rmdb-movieinfo-content">
        <div className="rmdb-movieinfo-thumb">
          <MovieThumb
            image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.png' }
            clickable={false}
          />
        </div>
        <div className="rmdb-movieinfo-text">
          <h1>{movie.title}</h1>
          <h3>PLOT</h3>
          <p>{movie.overview}</p>
          <h3>IMDB RATING</h3>
          <div className="rmdb-rating">
            <meter min="0" max="100" optimum="100" low="40" height="70" value={movie.vote_average * 10}></meter>
            <p className="rmdb-score">{movie.vote_average}</p>
          </div>
          {directors && directors.length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}
          {directors && directors.map((item, i) => {
            return <p key={i} className="rmdb-director">{item.name}</p>
          })}
        </div>
        <FontAwesome className="fa-film" name="film" size="5x" />
      </div>
    </div>
  )
};

MovieInfo.propTypes = {
  directors: PropTypes.array,
  movie: PropTypes.object
};

export default MovieInfo
