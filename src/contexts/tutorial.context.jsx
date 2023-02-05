import React, { createContext, useState, useEffect} from "react";
import { getTutorialDocs } from "../utils/firebase";

export const TutorialContext = createContext({
tutorial: [],
})

export const TutorialProvider = ({children}) =>{
    const [tutorial, setTutorials] = useState([])
    useEffect(()=>{
        const fetchTutorialsMap = async() =>{
            const tutorialsMap = await getTutorialDocs();
            setTutorials(tutorialsMap);
        }
        fetchTutorialsMap();
    }, [])
    const value = {tutorial}

    return(
        <TutorialContext.Provider value = {value}> {children}</TutorialContext.Provider>
    )
}