import React, { useState, useEffect } from 'react'
import './Home.css'
import HeroImage from "../../components/HeroImage/HeroImage";
import SearchBar from "../../components/SearchBar/SearchBar";
import FourColGrid from "../../components/FourColGrid/FourColGrid";
import Spinner from "../../components/Spinner/Spinner";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import {API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "../../config";
import MovieThumb from "../../components/MovieThumb/MovieThumb";

const Home = () =>  {
  const [state, setState] = useState({movies: []});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const fetchItems = async endpoint => {
    setIsError(false);
    
    try {
      const result = await (await fetch(endpoint)).json();
      setState(prev => ({
        ...prev,
        movies: [...prev.movies, ...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages
      }))
    } catch (e) {
      setIsError(true)
    }
    setIsLoading(false);
    
  };
  
  const updateItems = (loadMore, searchTerm) => {
    setIsLoading(true);
    let nowMovies, nowSearchTerm;
    if (loadMore) {
      nowMovies = state.movies;
      nowSearchTerm = state.searchTerm
    } else {
      nowMovies = [];
      nowSearchTerm = searchTerm
    }
    setState(prev => ({
      ...prev,
      movies: nowMovies,
      searchTerm: nowSearchTerm
    }));
    fetchItems(
    !nowSearchTerm ?
      buildEndpoint('movie/popular', loadMore) :
      buildEndpoint('search/movie', loadMore, nowSearchTerm)
    )
  };
  
  const buildEndpoint = (type,　loadMore=false, searchItem='') => {
    return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${
      loadMore && state.currentPage + 1}&query=${searchItem}
      `
  };
  
  // Run once on mount
  useEffect(() => {
    if (sessionStorage.getItem('HomeState')) {
      const persistedState = JSON.parse(sessionStorage.getItem('HomeState'))
      setState({...persistedState})
    } else {
      const endpoint = buildEndpoint('movie/popular');
      fetchItems(endpoint);
    }
  }, [ ]);
  
  useEffect(() => {
    if (!state.searchTerm) {
      sessionStorage.setItem('HomeState', JSON.stringify(state))
    }
  }, [state]);
  
  
  return (
    <div className="rmdb-home">
      {state.heroImage && !state.searchTerm?
        <div>
          <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
                     title={state.heroImage.original_title}
                     text={state.heroImage.overview}
          />
        </div> : null }
      <SearchBar callback={updateItems}/>
      <div className="rmdb-home-grid">
        <FourColGrid
          header={state.searchTerm ? 'Searched Result' : 'Popular Movies'}
          loading={isLoading}
        >
          {state.movies.map((item, i) => {
            return <MovieThumb
              key={i}
              clickable={true}
              image={item.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${item.poster_path}` : './images/no_image.jpg'}
              movieId={item.id}
              movieName={item.original_title}
            />
          })}
        </FourColGrid>
        {isLoading ? <Spinner/> : null}
        {(state.currentPage <= state.totalPages && !isLoading) ?
          <LoadMoreBtn
            onclick={updateItems}
            text="load more"
          />
        : null }
      </div>
    </div>
  )
};

export default Home
