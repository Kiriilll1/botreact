import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../axiosclient"
import { Link, useNavigate } from 'react-router-dom'

function Check(){
    const routerParams=useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        checkUserId(routerParams)
    },[])

    const checkUserId = (routerParams) => {
        const payload = {
            'data': routerParams.chatid
        }
        axiosClient.post("/getUserId",payload)
        .then((response)=>{
            if(response.data=="True"){
                navigate(`/${routerParams.chatid}/main`)
            }
            else{
                navigate(`/${routerParams.chatid}/login`)
            }
        })
    }

    return(
        <div className="text-center">
        <div className="spinner-border m-5 mx-auto" role="status" style={{color: '#8c64d8',width:"3rem", height:"3rem"}}>
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    )
}
export default Check