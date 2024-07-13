import { Link } from "react-router-dom"

import { FaStar } from "react-icons/fa"

const imgURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showMovie = true }) => {
    return (
        <div className="movie-card">
            <img src={imgURL + movie.poster_path} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>
                <FaStar /> {movie.vote_average}
            </p>
            {showMovie && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        </div>
    )
}

export default MovieCard
