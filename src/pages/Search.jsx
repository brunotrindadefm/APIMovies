import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import './MovieGrid.css'

const Search = () => {

  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {


    const resp = await fetch(url);
    const data = await resp.json();

    setMovies(data.results)
}

useEffect(() => {

    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-BR`;

    getSearchedMovies(searchWithQueryURL)
}, [query])


  return (
    <div className='container'>
      <h2 className='title'>Resultados para <span className="query-text">{query}</span></h2>
      <div className='movies-container'>
        {movies.length === 0 && <p>Loading...</p>}
        {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

    </div>
  )
}

export default Search
