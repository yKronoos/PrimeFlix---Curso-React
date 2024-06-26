import './style.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
           <Link className='logo' to="/">PrimeFlix</Link>
           <Link className='fav' to="/favoritos">Meus Filmes</Link>
        </header>
    )
}

export default Header