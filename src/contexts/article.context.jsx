import React, { createContext, useState, useEffect} from "react";
import { getArticleDocs } from "../utils/firebase";

export const ArticleContext = createContext({
article: [],
})

export const ArticleProvider = ({children}) =>{
    const [article, setArticles] = useState([])
    useEffect(()=>{
        const fetchArticlesMap = async() =>{
            const articlesMap = await getArticleDocs();
            setArticles(articlesMap);
        }
        fetchArticlesMap();
    }, [])
    const value = {article}

    return(
        <ArticleContext.Provider value = {value}> {children}</ArticleContext.Provider>
    )
}