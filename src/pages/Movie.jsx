import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs'

import './Movie.css'

import MovieCard from "../components/MovieCard"

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {

  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async (url) => {

    const resp = await fetch(url);
    const data = await resp.json();

    setMovie(data)
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  useEffect(() => {

    const movieURL = `${moviesURL}${id}?${apiKey}&language=pt-BR`
    getMovie(movieURL)

  }, [])

  return (
    <div className="movie-page">
      {movie && <div className="card-movie">
        <MovieCard movie={movie} showMovie={false} />
        <p className="tagline"></p>
        <div className="info">
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp /> Receita:
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit /> Duração:
          </h3>
          <p>{movie.runtime} min</p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit /> Data de lançamento:
          </h3>
          <p>{movie.release_date}</p>
        </div>
        <div className="info description">
          <h3>
            <BsFillFileEarmarkTextFill /> Descrição:
          </h3>
          <p>{movie.overview}</p>
        </div>
      </div>}
    </div>
  )
}

export default Movie
