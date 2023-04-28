import { wait } from "@testing-library/user-event/dist/utils"
import axios from "../axiosclient"
import { useEffect, useState, useRef} from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosClient from "../axiosclient"


function Login(){
  const first_nameRef=useRef()
  const last_nameRef=useRef()
  const emailRef=useRef()
  const phoneRef=useRef()
  const navigate = useNavigate()

  const routerParams = useParams()
  
  const onSubmit= async (ev) =>{
    ev.preventDefault()
    const payload={
      chat_id: routerParams.chatid,
      first_name: first_nameRef.current.value,
      last_name: last_nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value
    }
    console.log(payload);
    axiosClient.post("/createUser", payload)
      .then(({data})=>{
        navigate(`/${routerParams.chatid}/main`)
      })


  }


  return(
    <div className="container text-center">
      <div className="row">
        <img src="https://nethammer.online/images/logo.png" alt=""/>
      </div>
      <div className="row">
      <div>
      <label for="exampleFormControlInput1" class="form-label">Чтобы оставить отзыв или обратиться необходимо зарегистрироваться.</label>
      </div>
        <div class="mb-1 mt-3">
          <input ref={first_nameRef} for="validationCustom01" type="text" class="form-control" id="alidationCustom01" placeholder="Имя" required/>
        </div>
        <div class="mb-2 mt-3">
      <input ref={last_nameRef} type="text"  class="form-control" id="exampleFormControlInput2" placeholder="Фамилия"/>
          </div>
         
          <div class="mb-3 mt-3">
      <input ref={emailRef} type="email" class="form-control" id="exampleFormControlInput3" placeholder="email@"/>
        </div>
        <div class="mb-4 mt-1">
      <input ref={phoneRef} type="number" class="form-control" id="exampleFormControlInput4" placeholder="Номер телефона"/>
      </div>
      </div>
      <div class="d-grid gap-2">
        <Link to={`/${routerParams.chatid}/main`} type="Submit" class="btn" onClick={ev => {onSubmit(ev)}} style={{background: '#8c64d8',color:"#ffffff"}}>Отправить</Link>
        
      </div>
    </div>   
  )
}
export default Login