import React, { useState } from "react";
import { Divider, Grid, Rating } from 'semantic-ui-react';
import "./ArticleDetail.css";
import { updateUserRating } from './utils/firebase';
import {useLocation} from 'react-router-dom';

// Component to show the article details.
const ArticleDetail = () => {

    const location = useLocation();
    const [rating, setRating] = useState(location.state.rating);
    const [userRated, setUserRated] = useState(false);

    // Updates the rating and returns updated rating.
    const handleRating = async (e, { rating, maxRating }) => {
        const result = await updateUserRating("articles", location.state.docId, rating);
        setRating(result);
        setUserRated(true);
    }

    return (
        <div className="article-detail-div">
            <img className='article-detail-image' src={location.state.image}/>
            <h1>{location.state.title}</h1>
            <p className="para-detail">{location.state.article}</p>
            <Divider/>
            <Grid divided='vertically' columns={3}>
                <Grid.Row >
                    <Grid.Column className='art-col' floated='left' width={1}>
                        { userRated ? null : <Rating icon='star' maxRating={3} defaultRating={rating} onRate={handleRating} size='large'/>}
                        { userRated ? <Rating icon='star' maxRating={3} defaultRating={rating} disabled size='large'/> : null }
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <h4>{location.state.tags}</h4>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default ArticleDetail;