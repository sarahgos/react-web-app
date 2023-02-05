import React, { useState } from "react";
import { Divider } from 'semantic-ui-react';
import './QuestionDetail.css';
import Markdown from 'react-markdown';
import AnswerQuestion from "./AnswerQuestion";
import { getAnswerDocs } from "./utils/firebase";

// Displays the details of a question.
const QuestionDetail = (props) => {

    const [answers, setAnswers] = useState(false);
    const [list, setList] = useState([]);
    var answersMap = [];

    // Get the answers for the question from the database.
    const getAnswers = async() => {
        answersMap = await getAnswerDocs(props.docId);
        const array = Object.values(answersMap);
        setList(array);
        setAnswers(true);
    }

    getAnswers();

    return (
        <div>
            <div className="qd-div">
                <h3 className='qd-title'>{props.title}</h3>
                <p className="qd-question"><Markdown>{props.question}</Markdown></p>
                <Divider/>
                <p className="qd-para">{props.tags}</p>
                <Divider/>
                <p className="qd-para">{props.date}</p>
            </div>
            <h3 className='answers-subhead'>Answers</h3>
            <div className="answers-div">
                {answers ? <ul className='answer-list'>{list.map((answers) => <li className='answer-list-item'>{answers.comment}  <br></br>   - {answers.userEmail}</li>)}</ul> : null }
            </div>


            <br></br>

            <AnswerQuestion docId={props.docId}/>



        </div>
    )
}

export default QuestionDetail;