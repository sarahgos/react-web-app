import React, { useState } from "react";
import Button from "./ButtonSquare";
import { auth, addQuestionDoc } from './utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import './PostQuestion.css';
import InputField from './InputField';
import { useNavigate } from "react-router-dom";

// Renders the question option post.
function PostQuestion() {

    const [post, setPost] = useState({
        title:'',
        question:'',
        tags:''
    })

    const {title, question, tags} = post;
    const [user] = useAuthState(auth);
    const [errorMsg, setErrorMsg] = useState(0);
    const navigate = useNavigate();

    // Set input values.
    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setPost ((prevalue) => {
        if (name === 'title')
            return {
                title: value,
                question: prevalue.question,
                tags: prevalue.tags,
            }
        else if (name === 'question')
            return {
                title: prevalue.title,
                question: value,
                tags: prevalue.tags
            }
        else if (name === 'tags')
            return {
                title: prevalue.title,
                question: prevalue.question,
                tags: value
            }
        else if (name === 'code')
            return {
                title: prevalue.title,
                question: prevalue.question,
                tags: prevalue.tags
            }
        })
    }

    // Post question to db.
    const postQuestion = async() => {

        const result = await addQuestionDoc(user, title, question, tags);

        if (result === undefined)
        {
            setErrorMsg(true);
        }
        else
            navigate('/questions');     
    }

    return (
        <div className="question-outer-div">
        <div className="question-div">

            <label className="question-label" htmlFor='title'>Title*</label>
            
            <InputField 
                name='title'
                type='text'
                placeholder='Enter a descriptive title...'
                onChange={handleChange}
            ></InputField>

            <br></br>

            <label className="question-label" htmlFor='question'>Question*</label>
            <br>
            </br>
            <textarea className='q-textarea'
                name='question'
                placeholder='Describe your problem'
                style={{height:"400px", width:"600px"}}
                onChange={handleChange}
            />
            <br></br>
            <br></br>
            
            <label className="question-label" htmlFor='tags'>Tags*</label>
            <InputField 
                name='tags'
                placeholder='Please add up to 3 tags to describe what your question is about eg., Java...'
                onChange={handleChange}
            ></InputField>

            <br></br>
            <div>
                {errorMsg? <h4 className='error-msg'>Please enter all fields</h4>: <h4></h4>}
            </div>
             <br></br>
             
            <Button type='submit' color='teal' size='large' text='Post' event={postQuestion}></Button>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

    </div>

    )
}

export default PostQuestion;