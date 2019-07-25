import React, { Component } from 'react'
import './Home.css'
import HeroImage from "../../components/HeroImage/HeroImage";
import SearchBar from "../../components/SearchBar/SearchBar";
import FourColGrid from "../../components/FourColGrid/FourColGrid";
import Spinner from "../../components/Spinner/Spinner";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import {API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "../../config";
import MovieThumb from "../../components/MovieThumb/MovieThumb";

class Home extends Component{
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
  };
  
  componentDidMount() {
    if (localStorage.getItem('HomeState')) {
      const state = JSON.parse(localStorage.getItem('HomeState'))
      this.setState({...state})
    } else {
      this.setState({loading: true});
      this.fetchItems(this.buildEndpoint('movie/popular'))
    }
  }
  
  render() {
    const {movies, heroImage, loading, currentPage, totalPages, searchTerm} = this.state;
    return (
      <div className="rmdb-home">
        {heroImage ?
          <div>
            <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                       title={heroImage.original_title}
                       text={heroImage.overview}
            />
            <SearchBar callback={this.updateItems}/>
          </div> : null }
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? 'Searched Result' : 'Popular Movies'}
            loading={loading}
          >
            {movies.map((item, i) => {
              return <MovieThumb
                key={i}
                clickable={true}
                image={item.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${item.poster_path}` : './images/no_image.jpg'}
                movieId={item.id}
                movieName={item.original_title}
              />
            })}
          </FourColGrid>
          {loading ? <Spinner/> : null}
          {(currentPage <= totalPages && !loading) ?
            <LoadMoreBtn
              onclick={this.updateItems}
              text="load more"
            />
          : null }
        </div>
      </div>
    )
  }
  
  fetchItems = async endpoint => {
    const {movies, heroImage, searchTerm} = this.state
    const result = await (await fetch(endpoint)).json()
    this.setState({
      movies: [...movies, ...result.results],
      heroImage: heroImage || result.results[0],
      loading: false,
      currentPage: result.page,
      totalPages: result.total_pages
    }, () => {
      if (searchTerm === '') {
        localStorage.setItem('HomeState', JSON.stringify(this.state))
      }
    })
  };
  
  updateItems = (loadMore, searchTerm) => {
    this.setState({
      movies: loadMore? [...this.state.movies]: [],
      loading: true,
      searchTerm: loadMore? this.state.searchTerm : searchTerm
    }, () =>{
      this.fetchItems(
        !this.state.searchTerm ?
          this.buildEndpoint('movie/popular', loadMore) :
          this.buildEndpoint('search/movie', loadMore, this.state.searchTerm)
      )
    })
  };
  
  buildEndpoint = (type,　loadMore=false, searchItem='') => {
    return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${
      loadMore && this.state.currentPage + 1}&query=${searchItem}
      `
  }
}

export default Home
