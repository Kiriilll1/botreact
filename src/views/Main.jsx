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
    // const onGetTest = async(id)=>{
    //     const payload = {
    //         'subject_id': id
    //     }
    //     await axiosClient.post('quiz/getTest',payload)
    //         .then(({data}) => {
    //             setTest(data.data)
    //             console.log(data.data);
    //         })
    // }
    return(
        
        <div className="container" >
            
            <div className="row">
                <img src="https://nethammer.online/images/logo.png" alt=""/>
            </div>
            {
                subject.map((s) => (
                    <div className="row " style={{width:""}}>
                    
                    <div className="btn mt-1 " style={{ background: '#8c64d8', color: "#ffffff" }} type="button" data-bs-toggle='collapse' data-bs-target={`#${s.title.replace(' ', '')}`} aria-expanded="false" aria-controls='collapseExample'>
                        <div className="container-md row">
                            <a className="navbar-brand text-center" href="#">{s.title}</a>
                        </div>
                    </div>
                    <div className="collapse" id={s.title.replace(' ', '')}>
                        <div className="card card-body">
                            {
                                test.map((t) => (
                                    s.id == t.subject_id && <Link to={`/${routerParams.chatid}/quiz/${t.id}`} className="btn">{t.title}</Link>
                                ))
                            }
                        </div>
                    </div>
                    </div>
                ))
            }

            
        
      </div>
      )
  }
  export default Main