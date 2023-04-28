import { useEffect, useState } from "react"
import axiosClient from "../axiosclient"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
// style={{backgroundColor:"#8c64d8",color:"#ffffff"}}
function Courses(){
    const [user, setUser]= useState([])
    const routerParams = useParams()

    useEffect(()=>{
        getUser()
    },[])

    const getUser = async()=>{
        const payload={
            "chat_id":routerParams.chatid
        }
        await axiosClient.post("/getUser", payload)
        .then(({data})=>{
            console.log(data.data);
            setUser(data.data)
        })
    }



    return(
        <div className='container'>
            
            <div className="row" style={{background:"#8c64d8",height: "56px"}}> 
                <nav class="navbar navbar fixed-top" style={{color:"#ffffff"}}>
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#" style={{color:"#ffffff"}}>Мой профиль</a>
                        <button class="navbar-toggler btn btn-light"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvaskNavbar" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon "></span>
                        </button>
                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasRightLabell">
                            <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasRightLabel"style={{color:"#8c64d8"}}>Меню</h5>
                            <button type="button" class="btn-close" style={{color:"#8c64d8"}} data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                            <ul class="navbar-nav ">
                                <li class="nav-item">
                                    <div className="btn">
                                <Link to="#" class="nav-link "  href="#">Главная</Link>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div className="btn">
                                <Link to={`/${routerParams.chatid}/main`} class="nav-link" href="#">Курсы</Link>
                                    </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='row'>
                <div class="card" >
                    <ul class="list-group list-group-flush ">
                        {
                            user.map((q)=>( 
                                <><li class="list-group-item">Имя: {q.first_name}</li>   
                                <li class="list-group-item">Фамилия: {q.last_name}</li>
                                <li class="list-group-item">Почта: {q.email}</li>
                                <li class="list-group-item">Номер телефона: {q.phone}</li></>
                            ))
                        }
                    </ul>
                </div>
                <div className="card">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Ваши тесты:</li>
                        <li className="list-group-item">Прогресс: 
                        {/* <div class="progress" role="progressbar" style={{ color:"#8c64d8"}} aria-label="Animated striped example" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" style={{background:"#8c64d8",color:"#342827",width:"19.3413123%"}}>19%</div>
                        </div> */}
                        </li>
                    </ul>    
                </div>
            </div>
        </div>
        )
  }
  export default Courses