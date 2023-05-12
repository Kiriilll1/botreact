import { useEffect, useState } from "react"
import axiosClient from "../axiosclient"
import { Link, useParams } from 'react-router-dom'

function Main(){
    const [subject, setSubject] = useState([])
    const [test, setTest] = useState([])

    const routerParams = useParams()

    useEffect(()=> {
        getSubject()
    }, [])

    const getSubject = async () => {
        await axiosClient.post('/getSubTest')
            .then(async ({data}) => {
                await setSubject(data.subjects)
                await setTest(data.tests)
            })
    }

const shadowButton={
    boxShadow:"1px 2px 9px #342827 ",
    backgroundColor: "#8C64D8",
    color: "#FFFFFF"
};
const checkStyle={
    alignItems:"center",
    backgroundColor:"#8c64d8",
    border:"2px solid"
}

    return(
        
        <div className="container" >
          <div className="row" style={{background:"#8c64d8",height: "56px"}} > 
                <nav class="navbar navbar fixed-top" style={{color:"#ffffff"}} >
                    <div class="container-fluid">
                        <a class="navbar-brand " href="#" style={{color:"#ffffff"}}>
                            
                            Курсы</a>
                        <button class="navbar-toggler btn btn-light"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrollingLabel" aria-controls="offcanvaskNavbar" aria-label="Toggle navigation" >
                            <span class="navbar-toggler-icon "> </span>
                        </button>
                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasScrollingLabel" aria-labelledby="offcanvasRightLabell" aria-hidden="false" data-bs-scroll="true" data-bs-backdrop="false">
                            <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasRightLabel"style={{color:"#8c64d8"}}>Меню</h5>
                            <button type="button" class="btn-close" style={{color:"#8c64d8"}} data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body ">
                            <ul class="navbar-nav ">
                                <li class="nav-item">
                                    <div className="btn">
                                <Link to="#" class="nav-link "  href="#">Главная</Link>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div className="btn">
                                <Link to={`/${routerParams.chatid}/course`} class="nav-link" href="#">Мой профиль</Link>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <div className="btn">
                                <Link to="#" class="nav-link " href="#" style={{color:"#8c64d8"}}>Обратная связь</Link>
                                    </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="row">
                <img src="https://nethammer.online/images/logo.png" alt=""/>
            </div>
            {
                subject.map((s) => (
                    <div className="d-grid mt-1" style={{width:""}}>
                    
                    <div className="btn p-2 mb-3 " style={shadowButton} type="button" data-bs-toggle='collapse' data-bs-target={`#${s.title.replace(' ', '')}`} aria-expanded="false" aria-controls='collapseExample'>
                        <div className="container-md ">
                            <a className="navbar-brand text-center" href="#">{s.title}</a>
                        </div>
                    </div>
                    <div className="collapse" id={s.title.replace(' ', '')}>
                        <div className="card card-body">
                            {
                                test.map((t) => (
                                    <div className="from-check row ">
                                    
                                    {s.id == t.subject_id && <Link to={`/${routerParams.chatid}/quiz/${t.id}`} className="btn " style={{background:"",color:"#8c64d8",border:"2px solid"}}> <input className="" style={{checkStyle}} type="checkbox"  checked  />{t.title}</Link> }
                                
                                    
                                    
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    </div>
                ))
            }

            {/* Добавить чекбоксы при выполнении теста */}
        
      </div>
      )
  }
  export default Main