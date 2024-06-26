import { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) ||  [])
    }, [])

    function excluirFilme(id){
        let filtredFilmes = filmes.filter(e => e.id !== id)

        setFilmes(filtredFilmes)

        localStorage.setItem('@primeflix', JSON.stringify(filtredFilmes))
        toast.success("Filme foi excluido")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0  && <span>Não há filmes salvos!</span>}
            <ul>
                {filmes.map((filme) => {
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Exluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos