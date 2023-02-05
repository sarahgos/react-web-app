import React from "react";
import { Divider } from 'semantic-ui-react';
import './QuestionCard.css';
import Markdown from 'react-markdown';

// Displays the description information on a question card.
function QuestionCard(props) {

    const substring = props.question.substring(0, 100) + "...";

    return (
        <div>
        <div className="question-card-div">

            <h3>{props.title}</h3>
            <p className="para-question"><Markdown>{substring}</Markdown></p>
            <Divider/>
            <p className="para">{props.tags}</p>
            <Divider/>
            <p className="para">{props.date}</p>
            <p>{props.button}</p>
        </div>
        </div>
    )
}

export default QuestionCard;