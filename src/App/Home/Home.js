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
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      this.fetchItems(endpoint)
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
            <SearchBar callback={this.searchItems}/>
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
              onclick={this.loadMoreItem}
              text="load more"
            />
          : null }
        </div>
      </div>
    )
  }
  
  searchItems = (searchTerm) => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })
    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1}`
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}}`
    }
    this.fetchItems(endpoint)
  }
  
  loadMoreItem = () => {
    let endpoint = '';
    this.setState({loading: true});
    
    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage+1}`
    }
    this.fetchItems(endpoint)
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
}

export default Home
