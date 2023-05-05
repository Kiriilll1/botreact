import axios from "axios"


const axiosClient = axios.create({
    baseURL:"https://eraseborderbot-production.up.railway.app/quiz"
})
export default axiosClient