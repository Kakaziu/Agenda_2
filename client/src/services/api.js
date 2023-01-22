import axios from 'axios'

const api = axios.create({
    baseURL: 'https://backend-agenda.vercel.app/'
})

export default api