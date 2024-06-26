import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api'
import './filme-info.css'
import { toast } from "react-toastify";

function Filme(){
  const {id} = useParams()
  const naviation =  useNavigate()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'cbf82f2f2af19ce40c33e420fa52152a',
          langlage: "pt-BR"
        }
      }).then((res)=>{
        console.log(res.data)
        setFilme(res.data)
        setLoading(false)
      }).catch(() =>{
        console.log("Nao enconotrado")
        naviation('/', { replace: true })
        return
      })
    }
    console.log(filme)
    loadFilme()

    return () => {
      console.log("Componente desmonstado")
    }
  }, [naviation, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix")

    let filmesSalvos = JSON.parse(minhaLista) || []

    const hasFilme = filmesSalvos.some(e => e.id === filme.id)

    if(!hasFilme){
      filmesSalvos.push(filme)
      localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
      toast.success("Filme salvo")
    }else{
      toast.warn("Filme ja foi salvo")
      return
    }
  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando...</h1>
      </div>
    )
  }

  

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}></img>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average}</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button><a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
      </div>


    </div>
  )
}

export default Filme;