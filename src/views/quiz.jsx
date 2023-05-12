import { useEffect, useState } from "react"
import axiosClient from "../axiosclient"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { Form } from 'react-bootstrap'
import Result from "./result"
import ReactPlayer from "react-player";
import { configure } from "mobx"
import { makeAutoObservable, reaction, observable } from "mobx"


const quizNew = observable(() => {
    const AnswersStorage =  0
})

function Quiz(){
    const [question, setQuestion]= useState([])
    const [answer, setAnswer]= useState([]) 
    const routerParams = useParams()
    
    const [wrongAnswer, setWrongAnswer] = useState([])
    const [wrongQuestion, setWrongQuestion] = useState([])

    const [totalQuestion , setTotalQuestion] = useState(0)
    const [totalWrongQuestion , setTotalWrongQuestion] = useState(0)


    const [checked, setChecked] = useState(false)

    const [jopago, setJopago] = useState([])
    const [bool, setBool] = useState(false)
 
    useEffect(()=>{
        getQuestions()
        
    },[])

    const getQuestions= async()=>{
        
        const payload = {
            "test_id": routerParams.testid
        }
        await axiosClient.post('/getQuestionAnswer', payload)
        .then(async ({data})=>{
            await setQuestion(data.questions)
            await setAnswer(data.answers)
            await setTotalQuestion(data.question.length)
            
        })
    }

    const test = () => {
        setBool(true)
        if (bool === false) question.map((e) => jopago.push({q_id: e.id, a_id: 0}))
    }
    
    let checkanswer=[]
    const handleClickbox= (e, a, q) =>{
        const checkbox =document.getElementById(q.id)
        if (checkbox.checked){
            checkanswer.push({q_id: q.id, a_id: a.id})
            console.log(checkanswer)
            
        } else{
            let index 
            index=checkanswer.indexOf()
            checkanswer.splice(index, 1)
        }
    }
    
    
    const handleClicktext =(e, a, q) =>{
        test()
        console.log(a)
    }



    const handleClick = (e, a, q) => {
        test()
        console.log(jopago);
        let index = jopago.findIndex(e => e.q_id === a.question_id)
        if (index === - 1) {
            jopago.push({q_id: q.id, a_id: a.id})
        } else {
            jopago[index] = {q_id: q.id, a_id: a.id}
        }

        console.log(jopago);

    }
    const onSubmit=async (jopago)=>{
        setChecked(true)
        const payload = {
            "data": jopago
        }
        
            

        await axiosClient.post('/checkResult',payload)
        .then(async ({data})=>{
            setWrongQuestion(data.questions)
            setWrongAnswer(data.answers)
            setTotalWrongQuestion((oldState) => oldState + data.questions.length)
            
        });
        
        const load={
    
                "chat_id":routerParams.chatid,
                "test_id":routerParams.testid,
                "result":totalQuestion-totalWrongQuestion,
                "all_question":totalQuestion
        
        }
        axiosClient.post('/createResult',load)
    }
    
    return(
        <>
        {
            checked == false
                ?
                <>
                <div className="text-center mt-3">сделать название теста </div>
                <div className="container mt-3">
                <form class="Hueta">
                
                
                    {question.map((q) => (
                        <> <h1 className="text-center">
                            {q.text}
                        </h1>
                            {answer.map((a) => (
                                
                                a.question_id == q.id &&
                                
                                // <div className="form-check">
                                //     <input style={{ color:"#8c64d8"}} type="radio" id={q.id} name={q.id}/>
                                //     <label className="mt-1" htmlFor={q.id}>{a.text}</label>
                                // </div>
                                <div>
                                    
                                    <label style={{padding:"1px"}}> {a.text}
                                    <input class="form-check-input" style={{ color: "#8c64d8" }} type="radio" id={q.id} name={q.id} onChange={e => handleClick(e, a, q)} />
                                    </label>
                                    
                                
                                </div>

                            ))}
                        </>
                    ))}
                    <div class="progress fixed-top" role="progressbar" style={{ color: "#8c64d8" }} aria-label="Animated striped example" aria-valuemin="0" aria-valuemax="100">
                        <div class="striped variant text-center"  style={{ background: "#8c64d8", color: "#ffffff", width:"30%" }}> </div>
                    </div> 
                    <div  class="fixed-bottom p-3 mb-1">
                    <button className="container btn mt-1 " onClick={e => onSubmit(jopago)} style={{ background: '#8c64d8', color: "#ffffff" }} type="button">Сдать</button>
                    </div>
                </form>
            </div>
                </>
                :
                <div className="container" >
                    <h1 className="text-center p-2">Результат: </h1>
                    {wrongQuestion.map((q) => (
                        <> 
                        <h3 className="row mb-1 p-1">
                            {q.text}
                        </h3>
                            {
                                wrongAnswer.map((a) => (
                                    a.map((i) => (
                                        i.question_id == q.id &&
                                            (
                                                i.is_right == false 
                                                ?
                                                    i.is_clicked == true
                                                    ?
                                                        <h4 style={{color: "#ff0000"}}>{i.text}</h4>
                                                    :
                                                        <h4>{i.text}</h4>
                                                :
                                                    i.question_id == q.id &&
                                                        <h4 style={{color: '#00ff15'}}>{i.text}</h4>
                                            )                                        
                                    ))
                                ))
                            }
                        </>
                    ))}

                    <h1 className="text-center p-2">Верных ответов: {totalQuestion-totalWrongQuestion} из {totalQuestion}</h1>
                    {
                        totalQuestion===totalQuestion-totalWrongQuestion &&
                        <div> Ты ответил на все вопросы правильно вот твой SIUUUU
                            <ReactPlayer url="https://www.youtube.com/watch?v=TP_FoJfDPCQ&ab_channel=ElTrend" width="100%" controls></ReactPlayer>
                        </div>
                    }
                
                
                <div className="fixed-bottom p-4 mb-3"  >
                    <div className="">
                        <p style={{textAlign:"left"}}>🟩 - верный ответ  🟥 - ваш ответ</p> 
                    </div>
                </div>
                
                <div className="fixed-bottom d-grid gap-2 p-2"><Link to={`/${routerParams.chatid}/main`} className="btn " style={{background:"#8c64d8",color:"#ffffff"}}>Вернуться к тестам</Link></div>    
                    
                
                </div>
        }
        </>
        
    )
}

export default Quiz

