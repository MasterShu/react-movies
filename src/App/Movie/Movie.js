import React from 'react'
import './Movie.css'
import Navigation from "../../components/Navigation/Navigation";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import MovieInfoBar from "../../components/MovieInfoBar/MovieInfoBar";
import FourColGrid from "../../components/FourColGrid/FourColGrid";
import Spinner from "../../components/Spinner/Spinner";
import {API_KEY, API_URL} from "../../config";
import Actor from "../../components/Actor/Actor";

class Movie extends React.Component{
  state = {
    movie: null,
    actors: null,
    directors: null,
    loading: false
  };
  
  componentDidMount() {
    const stateStorage = localStorage.getItem(`movie_${this.props.match.params.movieId}`)
    if (stateStorage) {
      const state = JSON.parse(stateStorage)
      this.setState({...state})
    } else {
    
    this.setState({loading: true})
    // finish fetch the movie
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`
    this.fetchItem(endpoint)
    }
  }
  
  fetchItem = async endpoint => {
    const {movieId} = this.props.match.params.movieId
    try {
      const result = await (await fetch(endpoint)).json();
      if (result.status_code) {
        // If we don't find any movie
        this.setState({loading: false})
      } else {
        this.setState({movie: result}, async () => {
          // then fetch actors in the setState callback function
          const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
          const creditsResult = await (await fetch(endpoint)).json();
          const directors = creditsResult.crew.filter((member) => member.job === 'Director');
          this.setState({
            actors: creditsResult.cast,
            directors: directors,
            loading: false
          }, () => {
            localStorage.setItem(`movie_${movieId}`, JSON.stringify(this.state))
          })
        })
      }
    } catch(error) {
      console.error('Error: ', error)
    }
  };
  
  render() {
    const {movie, actors, directors, loading} = this.state;
    const { location } = this.props;
    return (
      <div className="rmdb-movie">
        {movie ?
          <div>
            <Navigation movie={location.movieName} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
          </div>
          : null}
        {actors ?
          <div className="rmdb-movie-grid">
            <FourColGrid header={'Actors'}>
              {actors.map((item, i) => {
                return <Actor key={i} actor={item}/>
              })}
            </FourColGrid>
          </div>
          : null
        }
        {!actors && !loading ? <h1>Oh! We can't find movie.</h1> : null}
        {loading ? <Spinner/> : null}
      </div>
    )
  }
}

export default Movie
