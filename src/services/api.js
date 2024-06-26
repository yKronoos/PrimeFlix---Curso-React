import axios from "axios";

//base :  https://api.themoviedb.org/3/
//URL: /movie/now_playing?api_key=cbf82f2f2af19ce40c33e420fa52152a&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api