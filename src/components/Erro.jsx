import '../pages/MovieGrid.css'
import { TbError404 } from "react-icons/tb";

const Erro = ({ erro, query }) => {
    return (
        <div className="erro">
            <p>{erro}</p>
            <p><span className='query-text'>{query}</span></p>
            <div className='error404'>
                <TbError404 />
                <p>Not Found</p>
            </div>
        </div>
    )
}

export default Erro
