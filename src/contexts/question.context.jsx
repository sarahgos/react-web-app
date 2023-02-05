import React, { createContext, useState, useEffect} from "react";
import { getQuestionDocs } from "../utils/firebase";

export const QuestionContext = createContext({
question: [],
})

export const QuestionProvider = ({children}) =>{
    const [question, setQuestions] = useState([])
    useEffect(()=>{
        const fetchQuestionsMap = async() =>{
            const questionsMap = await getQuestionDocs();
            setQuestions(questionsMap);
        }
        fetchQuestionsMap();
    }, [])
    const value = {question}

    return(
        <QuestionContext.Provider value = {value}> {children}</QuestionContext.Provider>
    )
}