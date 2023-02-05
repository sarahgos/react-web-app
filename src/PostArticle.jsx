import React, { useState } from "react";
import Button from "./ButtonSquare";
import { auth, addArticleDoc } from './utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import UploadImage from './UploadImage';
import InputField from './InputField';
import './PostArticle.css';
import { useNavigate } from "react-router-dom";

// Renders the article post option.
function PostArticle() {

    const [post, setPost] = useState({
        title:'',
        abstract:'',
        article:'',
        tags:'',
        imageId:''
    })

    const {title, abstract, article, tags, imageId} = post;
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
                abstract: prevalue.abstract,
                article: prevalue.article,
                tags: prevalue.tags
            }
        else if (name === 'abstract')
            return {
                title: prevalue.title,
                abstract: value,
                article: prevalue.article,
                tags: prevalue.tags
            }
        else if (name === 'article')
            return {
                title: prevalue.title,
                abstract: prevalue.abstract,
                article: value,
                tags: prevalue.tags
            }
        else if (name === 'tags')
            return {
                title: prevalue.title,
                abstract: prevalue.abstract,
                article: prevalue.article,
                tags: value
            }
        })
    }

    // Post question to db.
    const postArticle = async() => {

        const result = await addArticleDoc(user, title, abstract, article, tags, imageId);

        if (result === undefined)
        {
            setErrorMsg(true);
        }
        else {
            navigate('/');   
        }
    }

    const pullImageId = (value) => {
       setPost ((prevalue) => {
        return {
            title: prevalue.title,
            abstract: prevalue.abstract,
            article: prevalue.article,
            tags: prevalue.tags,
            imageId: value
        }
       })
    }

    return (
        <div className="article-outer-div">
            <div className="article-div">

                <label className="article-label" htmlFor='title'>Title*</label>
                <InputField 
                    name='title'
                    type='text'
                    placeholder='Enter a descriptive title...'
                    onChange={handleChange}
                ></InputField>

                <br></br>

                <div>
                    <label className="article-label" htmlFor='abstract'>Abstract*</label>
                    <InputField 
                        name='abstract'
                        placeholder='Enter a 1-paragraph abstract...'
                        style={{height:"100px", width:"600px"}}
                        onChange={handleChange}
                    ></InputField>
                </div>

                <br></br>

                <label className="article-label" htmlFor='article'>Article*</label>
                <InputField 
                    name='article'
                    placeholder='Enter the article text...'
                    style={{height:"400px"}}
                    onChange={handleChange}
                ></InputField>

                <br></br>
                
                <label className="article-label" htmlFor='tags'>Tags*</label>
                <InputField 
                    name='tags'
                    placeholder='Please add up to 3 tags to describe what your article is about eg., Java...'
                    onChange={handleChange}
                ></InputField>

                
                <br></br>
                <br></br>

                <div className="add-image">
                    <p className="article-label">Add an image to your article*</p>
                    <UploadImage name='image' func={pullImageId} />
                </div>

                <br></br>
                <div>
                    {errorMsg? <h4 className='error-msg'>Please enter all fields</h4>: <h4></h4>}
                </div>
                 <br></br>

                <Button type='submit' color='teal' size='large' text='Post' event={postArticle}></Button>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
        </div>
    )
}

export default PostArticle;