import React, { useContext, useState } from "react";
import QuestionCard from "./QuestionCard";
import { Grid, Icon, Modal, Button,  ModalContent } from 'semantic-ui-react';
import { QuestionContext } from './contexts/question.context';
import QuestionDetail from "./QuestionDetail";
import Draggable from 'react-draggable';
import './QuestionCardList.css'
import { useEffect } from "react";


// Component used to display the list of questions.
function QuestionCardList(props) {

    const {question} = useContext(QuestionContext);
    const questionArray = Object.values(question);
    const [open, setOpen] = React.useState(false)
    const [questionList, setQuestionList] = useState([]);
    const [index, setIndex] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState();
    var filteredQuestions = questionList;
    
    useEffect(() => {
        setQuestionList([...questionArray]);
    }, [question]);

    // Used to filter based on which button has been pushed.
    if (selectedFilter === 'tags')
    {
        filteredQuestions = questionList.filter((questionList) => {
            return questionList.tags.toLowerCase().includes(props.searchQuestions)
    })}
    if (selectedFilter === 'title')
    {
        filteredQuestions = questionList.filter((questionList) => {
            return questionList.title.toLowerCase().includes(props.searchQuestions)
    })}
    if (selectedFilter === 'question')
    {
        filteredQuestions = questionList.filter((questionList) => {
            return questionList.question.toLowerCase().includes(props.searchQuestions)
    })}
    if (selectedFilter === 'date')
    {
        filteredQuestions = questionList.filter((questionList) => {
            return questionList.createdAt.toDate().toDateString().toLowerCase().includes(props.searchQuestions)
    })}
    if (selectedFilter === 'all')
    {
        filteredQuestions = questionList;
    }

    // Sets the index of card when clicked.
    const setQuestionIndex = (i) => {
        if (!open)
            setIndex(i);
    }

    // Removes item from list.
    const removeItem = (i) => {
        const array = questionList.splice(i, 1);
        const newArray = questionList.splice(0, questionList.length);
        setQuestionList(newArray);
    }

    // Sets the filter.
    const chooseSearch = (search) => {
        setSelectedFilter(search);
    }  

    return (
        <div>
            <div className='filter-buttons'>
             <Button color='grey' onClick={() => (chooseSearch('tags'))}>Tags</Button>
            <Button color='grey' onClick={() => (chooseSearch('title'))}>Title</Button>
            <Button color='grey' onClick={() => (chooseSearch('question'))}>Question</Button>
            <Button color='grey' onClick={() => (chooseSearch('date'))}>Date</Button>
            <Button color='grey' onClick={() => (chooseSearch('all'))}>Show All</Button>
            </div>
       <Grid padded centered>
            <Grid.Row>

            {filteredQuestions.map((question, i) => 
            <Draggable grid={[25, 25]}>
            <div>
            <div key={i} className='card-div'><Icon link className='close-icon' name='close' onClick={() => (removeItem(i))}/>
            <br></br>
            <div className="q-div" onClick={() => (setQuestionIndex(i))}>
                <Modal 
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button color='teal'>Expand Question</Button>}>
                <ModalContent>
                <QuestionDetail 
                    title={filteredQuestions[index].title}
                    question={filteredQuestions[index].question}
                    tags={filteredQuestions[index].tags}
                    docId={filteredQuestions[index].docId}
                    date={JSON.stringify(filteredQuestions[i].createdAt.toDate().toDateString())}
                    searchTerm={props.searchQuestions}  
                />
                </ModalContent>
            </Modal>
                <QuestionCard 
                    title={question.title}
                    question={question.question}
                    tags={question.tags}
                    date={JSON.stringify(question.createdAt.toDate().toDateString())}   
                />
                </div>
            </div>
            </div>
            </Draggable>
            )}
            
            </Grid.Row>
        </Grid>
        </div>
    )
}

export default QuestionCardList;