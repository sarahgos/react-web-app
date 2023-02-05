import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/user.context";
import { addCommentDoc } from "./utils/firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InputField from "./InputField";
import ButtonSquare from "./ButtonSquare";
import './AnswerQuestion.css';

// Component allows the user to answer questions posted ont eh questions page.
const AnswerQuestion = (props) => {

    const { currentUser } = useContext(UserContext);
    const [answer, setAnswer] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const auth = getAuth();

    useEffect(() => {
        // Check whether user logged in.
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
            }
        });
    }, [])

    // If there is no user logged in they cannot answer a question.
    if (loggedIn === false) {
        return <h3 className='login-error'>Log in to reply to this question</h3>
    }

    // Add a comment doc to the database.
    const onSubmit = async() => {

        const email = auth.currentUser.email;
        await addCommentDoc(email, answer, props.docId)
    }

    // Set input values.
    const handleChange = (event) => {
        const value = event.target.value

        setAnswer(value);
    };
    
    return (
        <div className="answer-div">
            <InputField 
                className='answer-input'
                name='answer'
                placeholder='Add your answer to this question'
                onChange={handleChange}
            />
            <br></br>
            <ButtonSquare text='Post Answer' color='teal' event={onSubmit} />
        </div>
    )
}

export default AnswerQuestion;