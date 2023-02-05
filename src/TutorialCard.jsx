import React, { useState, useEffect } from "react";
import { Divider, Grid, Rating } from 'semantic-ui-react';
import "./TutorialCard.css";
import ReactPlayer from 'react-player';
import { updateVideoViews, updateUserRating } from './utils/firebase';
import { useNavigate } from 'react-router-dom';
import Button from './ButtonSquare';

function Card(props) {

    const [views, setViews] = useState(props.views);
    const [rating, setRating] = useState(props.rating);
    const [userRated, setUserRated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(rating);
       },[rating]);

    // Update the video views each time a video is started.
    const updateViews = async() => {
        const result = await updateVideoViews(props.docId, props.views);    
        setViews(result);
    }

    // Update the ratings when a user rates and disable the ratings stars.
    const handleRating = async (e, { rating, maxRating }) => {
        const result = await updateUserRating("tutorials", props.docId, rating);
        console.log(result);
        setRating(result);
        setUserRated(true);
    }

    // Navigate to the details tutorial page and pass the props as references.
    const cardDetail = () => {
        navigate('/tutorial-detail', { 
            state: { 
                videoId: props.videoId,
                title: props.title,
                tags: props.tags,
                docId: props.docId,
                description: props.description,
                userId: props.userId,
                rating: props.rating,
                ratingsAmount: props.ratingsAmount,
                views: views
            }
         });
    }

    return (
        <div className="tutorial-card-div">
           <ReactPlayer width='500px' className='video' onStart={updateViews} controls={true} url={props.videoId}/>
            <h3>{props.title}</h3>
            <p className="para-tut">{props.description}</p>
            <h4>Uploaded by {props.userId}</h4>
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
                        <h4>{props.tags}</h4>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Button text='View Tutorial' color='teal' event={cardDetail}/>
        </div>
    )
}

export default Card;