import { createBrowserRouter } from "react-router-dom";
import App from "./views/Login";
import Main from "./views/Main";
import Courses from "./views/course";
import Check from "./views/check"; 
import Quiz from "./views/quiz"; 
import Test from "./views/test";
import Result from "./views/result";

const router = createBrowserRouter([
    {
        path:"/:chatid/login",
        element:<App/>,
        
    },
    {
        path:"/:chatid/main",
        element:<Main/>,
    },
    {
        path:"/:chatid/course",
        element:<Courses/>,
    },
    {
        path:"/:chatid",
        element:<Check/>,
    },
    {
        path:"/:chatid/quiz/:testid",
        element: <Quiz/>
    },
    {
        path:"/Test",
        element:<Test/>
    },
    {
        path:"/:chatid/quiz/Result",
        element:<Result/>
    }
])
export default router