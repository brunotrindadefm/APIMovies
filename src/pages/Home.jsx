import React from 'react'
import { useState, useEffect } from 'react'

import './MovieGrid.scss'

import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {

    const [topMovies, setTopMovies] = useState([])
    const [loading, setLoading] = useState(false)

    const getTopRatedMovies = async (url) => {

        setLoading(true)

        try {
            const resp = await fetch(url);
            const data = await resp.json();

            setTopMovies(data.results)
            console.log(data.results)
        } catch (erro) {
            erro.message
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const topRatedUrl = `${moviesURL}popular?${apiKey}&language=pt-BR`;

        getTopRatedMovies(topRatedUrl)
    }, [])

    return (
        <div className='container'>
            {!loading &&
                <h2 className='title'>Filmes populares</h2>
            }
            <div className='movies-container'>
                {topMovies.length === 0 && <div className="erro-loading">
                    <Loading />
                </div>}
                {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Home
