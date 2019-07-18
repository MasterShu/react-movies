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
    this.setState({loading: true})
    // finish fetch the movie
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`
    this.fetchItem(endpoint)
  }
  
  fetchItem = (endpoint) => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        if (result.status_code) {
          this.setState({loading: false})
        } else {
          this.setState({movie: result}, () => {
            // then fetch actors in the setState callback function
            const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`
            fetch(endpoint)
              .then(result=> result.json())
              .then(result => {
                const directors = result.crew.filter((member) => member.job === 'Director')
                this.setState({
                  actors: result.cast,
                  directors: directors,
                  loading: false
                })
              })
          })
        }
      })
      .catch(error => console.error('Error: ', error))
  };
  
  render() {
    return (
      <div className="rmdb-movie">
        {this.state.movie ?
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo movie={this.state.movie} directors={this.state.directors} />
            <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
          </div>
          : null}
        {this.state.actors ?
          <div className="rmdb-movie-grid">
            <FourColGrid header={'Actors'}>
              {this.state.actors.map((item, i) => {
                return <Actor key={i} actor={item}/>
              })}
            </FourColGrid>
          </div>
          : null
        }
        {!this.state.actors && !this.state.loading ? <h1>Oh! We can't find movie.</h1> : null}
        {this.state.loading ? <Spinner/> : null}
      </div>
    )
  }
}

export default Movie
