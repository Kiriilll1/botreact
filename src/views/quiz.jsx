import { useEffect, useState } from "react"
import axiosClient from "../axiosclient"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Form } from 'react-bootstrap'

function Quiz(){
    const [question, setQuestion]= useState([])
    const [answer, setAnswer]= useState([]) 
    const routerParams = useParams()
    const [count, setCount]=useState(0)

    const [test, setTest] = useState("test")

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
        
        })
    }
    let incorrect = [{id: 2, question_id: 2, text: 'Лежа', is_right: false, is_clicked: false}]
    let array = []

    const handleClick = (e, a) => {
        console.log(a);
        if (a.is_right == false) {
            
        }
    }

    return(
        <div className="container mt-3">
            <form class="Hueta">
            {
                question.map((q)=>(
                    <> <h1 className="text-center ">
                        {q.text}
                    </h1>
                    {
                        answer.map((a)=>(
                                a.question_id == q.id &&
                                // <div className="form-check">
                                //     <input style={{ color:"#8c64d8"}} type="radio" id={q.id} name={q.id}/>
                                //     <label className="mt-1" htmlFor={q.id}>{a.text}</label>
                                // </div>

                                <div className="form-check">
                                    <input style={{ color:"#8c64d8"}} type="radio" id={q.id} name={q.id} onChange={e => handleClick(e, a)} value={a.is_right} />
                                    <label className="mt-1" htmlFor={q.id}>{a.text}</label>
                                </div>

                        ))
                    }
                    </>
                ))
            }
            <div class="progress fixed-top " role="progressbar" style={{ color:"#8c64d8"}} aria-label="Animated striped example" aria-valuemin="0" aria-valuemax="100">
                <div class="striped variant" style={{background:"#8c64d8",color:"#342827", width:"6%"}}>{}</div>
            </div>
            <button className="container btn mt-1 " onClick style={{ background: '#8c64d8', color: "#ffffff" }} type="button">Сдать</button>
        </form>
        </div>
        
    )
}

export default Quiz

