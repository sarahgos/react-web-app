import React, { useState } from "react";
import { Divider, Grid, Rating } from 'semantic-ui-react';
import "./ArticleCard.css";
import { updateUserRating } from './utils/firebase';
import Button from './ButtonSquare';
import { useNavigate } from 'react-router-dom';

// Article card.
function Card(props) {

    const [rating, setRating] = useState(props.rating);
    const [userRated, setUserRated] = useState(false);
    const navigate = useNavigate();

    // Gets the new rating from the user, updates and returns updated rating.
    const handleRating = async (e, { rating }) => {
        const result = await updateUserRating("articles", props.docId, rating);
        setRating(result);
        setUserRated(true);
    }

    // Navigates to article detail, passing prop references.
    const cardDetail = () => {
        navigate('/article-detail', { 
            state: { 
                image: props.image,
                title: props.title,
                article: props.article,
                tags: props.tags,
                docId: props.docId,
                rating: props.rating,
                ratingsAmount: props.ratingsAmount
            }
         });
    }

    return (
        <div className="article-card-div">
            <img className='article-image' src={props.image}/>
            <h3>{props.title}</h3>
            <p className="para">{props.article}</p>
            <Divider/>
            <Grid divided='vertically' columns={3}>
                <Grid.Row >
                    <Grid.Column className='art-col' floated='left' width={1}>
                        { userRated ? null : <Rating icon='star' maxRating={3} defaultRating={rating} onRate={handleRating} size='large'/>}
                        { userRated ? <Rating icon='star' maxRating={3} defaultRating={rating} disabled size='large'/> : null }
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <h4>{props.tags}</h4>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Button text='Read Article' color='teal' event={cardDetail}/>
        </div>
    )
}

export default Card;