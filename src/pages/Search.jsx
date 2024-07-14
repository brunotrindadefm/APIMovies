import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import './MovieGrid.css'
import Loading from "../components/Loading"
import Erro from "../components/Erro"

const Search = () => {

  const [searchParams] = useSearchParams();

  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {

    setLoading(true)
    setErro(null)
    setMovies([])

    try {
      const resp = await fetch(url);
      const data = await resp.json();

      if (resp.ok) {
        if (data.results.length > 0) {
          setMovies(data.results);
        } else {
          setErro('Nenhum resultado encontrado para');
        }
      }

    } catch (erro) {
      setErro(erro.message)
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {

    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=pt-BR`;

    getSearchedMovies(searchWithQueryURL)
  }, [query])


  return (
    <div className='container'>
    {!erro && !loading && 
      <h2 className='title'>Resultados para <span className="query-text">{query}</span></h2>
    }
      {loading &&
        <div className="erro-loading">
          <Loading />
        </div>
      }
      {erro &&
        <div className="erro-loading">
          <Erro erro={erro} query={query}/>
        </div>
      }
      <div className='movies-container'>
        {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

    </div>
  )
}

export default Search
