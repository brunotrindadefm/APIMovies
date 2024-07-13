import React from 'react'
import { useState, useEffect } from 'react'

import './MovieGrid.css'

import MovieCard from '../components/MovieCard';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {

    const [topMovies, setTopMovies] = useState([])

    const getTopRatedMovies = async (url) => {


        const resp = await fetch(url);
        const data = await resp.json();

        setTopMovies(data.results)
        console.log(data.results)
    }

    useEffect(() => {

        const topRatedUrl = `${moviesURL}popular?${apiKey}&language=pt-BR`;

        getTopRatedMovies(topRatedUrl)
    }, [])

    return (
        <div className='container'>
            <h2 className='title'>Filmes populares</h2>
            <div className='movies-container'>
            {topMovies.length === 0 && <p>Loading...</p>}
                {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>

        </div>
    )
}

export default Home
