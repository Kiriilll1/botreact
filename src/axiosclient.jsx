import axios from "axios"


const axiosClient = axios.create({
    baseURL:"http://192.168.237.14:8000/quiz"
})
export default axiosClient