import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useState} from 'react'

import './NavBar.scss'

const NavBar = () => {

    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;

        navigate(`/search?q=${search}`);
        setSearch('');
    }

    return (
        <nav id='navbar'>
            <h2>
                <Link to="/"><BiCameraMovie />BTFilmes</Link>
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setSearch(e.target.value)} value={search}
                    type="text" placeholder='Pesquise aqui qualquer filme'
                />
                <button type='submit'><BiSearchAlt2 /></button>
            </form>
        </nav>
    )
}

export default NavBar
