import React, { useContext, useEffect } from "react";
import Card from "./ArticleCard";
import "./ArticleCardList.css";
import { Grid } from 'semantic-ui-react';
import { ArticleContext } from './contexts/article.context';
import { useState } from "react";
import ButtonRounded from "./ButtonRounded";
import Heading from "./Headings";

// Used to pass the props through to be displayed.
function CardComponent(listItem, i) {
    return (
        <Card 
            key={i}
            image={listItem.imageId}
            title={listItem.title}
            article={listItem.article}
            tags={listItem.tags}
            docId={listItem.docId}
            rating={listItem.rating}
            ratingsAmount={listItem.ratingsAmount}
        />
    )
}

// Gets the articles from the database and sends to cars to display.
const ArticleCardList = () => {

    const {article} = useContext(ArticleContext);
    const articleArray = Object.values(article);
    const [articleList, setArticleList] = useState([]);
    const [allArticles, setAllArticles] = useState();

    // Use a timer to wait for images to load before displaying.
    useEffect(() => {
        setTimeout(() => {
            setArticleList(articleArray.slice(0, 3))
         }, 1000);
       },[article]);

    // Show all articles.
    const showAllArticles = () => {
        setArticleList([...articleArray]);
        setAllArticles(true);
    }

    // Hide articles.
    const hideAllArticles = () => {
        setArticleList(articleArray.slice(0, 3));
        setAllArticles(false);
    }

    return (
        <div>
            { allArticles? <Heading text="All Articles"/> : <Heading text="Featured Articles"/>}
            <br></br>
        <div className="cardlist-div">
            <Grid padded centered>
                <Grid.Row>
                    {articleList.map(CardComponent)}
                </Grid.Row>
            </Grid>
        </div>
        <div className='all-button'>
            { allArticles? <ButtonRounded text="Hide all articles" color="black" event={hideAllArticles}/> :
            <ButtonRounded text="See all articles" color="black" event={showAllArticles}/>}
        </div>
        </div>
    )
}

export default ArticleCardList;