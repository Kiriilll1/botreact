import axios from "axios"


const axiosClient = axios.create({
    // baseURL:"https://eraseborderbot-production-35f3.up.railway.app/quiz"
    baseURL:"http://192.168.237.14:8000/quiz"
})
export default axiosClient