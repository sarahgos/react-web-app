import React, { useContext, useEffect } from "react";
import Card from "./TutorialCard";
import "./TutorialCardList.css";
import { Grid} from 'semantic-ui-react';
import { TutorialContext } from './contexts/tutorial.context';
import { useState } from "react";
import ButtonRounded from "./ButtonRounded";
import Heading from "./Headings";
import { useNavigate } from 'react-router-dom';

// Component to send the props to be displayed.
function VideoCardComponent(listItem, i) {
    return (
        <Card 
            key={i}
            videoId={listItem.videoId}
            title={listItem.title}
            description={listItem.description}
            userId={listItem.userId}
            views={listItem.views}
            tags={listItem.tags}
            docId={listItem.docId}
            rating={listItem.rating}
            ratingsAmount={listItem.ratingsAmount}
        />
    )
}

const TutorialCardList = () => {

    const {tutorial} = useContext(TutorialContext);
    const tutorialArray = Object.values(tutorial);
    const [tutorialList, setTutorialList] = useState([]);
    const [allTutorials, setAllTutorials] = useState();
    const navigate = useNavigate();

    // Use a timer to wait for images to load before displaying.
    useEffect(() => {
        const timeout = setTimeout(() => {
            setTutorialList(tutorialArray.slice(0, 2))
         }, 2500);
       },[tutorial]);

    // Show all articles.
    const showAllTutorials = () => {
        setTutorialList([...tutorialArray]);
        setAllTutorials(true);
    }

    // Hise all articles.
    const hideAllTutorials = () => {
        setTutorialList(tutorialArray.slice(0, 2));
        setAllTutorials(false);
    }

    const postTutorial = () => {
        navigate('/post-tutorial');
    }

    return (
        <div>
            { allTutorials? <Heading text="All Tutorials"/> : <Heading text="Featured Tutorials"/>}
            <br></br>
            { allTutorials? <div className="top-button"><ButtonRounded text="Add a tutorial" color="blue" event={postTutorial}/></div> : null}
        <div className="cardlist-div">
            <Grid padded centered>
                <Grid.Row>
                    {tutorialList.map(VideoCardComponent)}
                </Grid.Row>
            </Grid>
        </div>
        <div className='all-button'>
            { allTutorials? <div><ButtonRounded text="Hide all tutorials" color="black" event={hideAllTutorials}/></div> :
            <ButtonRounded text="See all tutorials" color="black" event={showAllTutorials}/>}
        </div>
        </div>
    )
}

export default TutorialCardList;