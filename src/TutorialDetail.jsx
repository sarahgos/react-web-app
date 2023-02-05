import React, { useState } from "react";
import { Divider, Grid, Rating } from 'semantic-ui-react';
import "./TutorialDetail.css";
import ReactPlayer from 'react-player';
import { updateVideoViews, updateUserRating } from './utils/firebase';
import {useLocation} from 'react-router-dom';

// Component to display the tutorial in detail.
function TutorialDetail() {

    const location = useLocation();

    const [views, setViews] = useState(location.state.views);
    const [rating, setRating] = useState(location.state.rating);
    const [userRated, setUserRated] = useState(false);

    // Update user views on video start.
    const updateViews = async() => {
        const result = await updateVideoViews(location.state.docId, location.state.views);    
        setViews(result);
    }

    // Update and return updated rating.
    const handleRating = async (e, { rating, maxRating }) => {
        const result = await updateUserRating("tutorials", location.state.docId, rating);
        setRating(result);
        setUserRated(true);
    }

    return (
        <div className="tutorial-detail-div">
           <ReactPlayer width='800px' height='600px' className='video-detail' onStart={updateViews} controls={true} url={location.state.videoId}/>
            <h1>{location.state.title}</h1>
            <p className="para-tut">{location.state.description}</p>
            <h4>Uploaded by {location.state.userId}</h4>
            <Divider/>
            <Grid divided='vertically' columns={3}>
                <Grid.Row >
                    <Grid.Column floated='left' className='views' width={2}>
                    <p>Views: {views}</p>
                    </Grid.Column>
                    <Grid.Column floated='left' width={1}>
                        <p>Rating:</p>
                        { userRated ? null : <Rating icon='star' maxRating={3} defaultRating={rating} onRate={handleRating} size='large'/>}
                        { userRated ? <Rating icon='star' maxRating={3} defaultRating={rating} disabled size='large'/> : null }
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <h4>{location.state.tags}</h4>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
         
        </div>
    )
}

export default TutorialDetail;