import React, { useState, useEffect } from "react";
import { getFeedbackDocs } from "./utils/firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './UserFeed.css';

// The user fee component.
const UserFeed = () => {

    const auth = getAuth();
    const [feed, setFeed] = useState(false);
    const [list, setList] = useState([]);
    var feedMap = [];
    const navigate = useNavigate();

    useEffect(() => {
        setList(list);
        setFeed(true);
    }, [list])

    // Get the users feed from the database.
    const getFeed = async() => {
        feedMap = await getFeedbackDocs(auth.currentUser.uid);
        const array = Object.values(feedMap);
        setList(array);
        setFeed(true);
    }

    getFeed();

    // Navigate to question page.
    const navQuestion = () => {
        navigate('/questions');
    }

    return (
        <div className='feed-div'>
            <br></br>
            <h1 className='heading-feed'>My Feed</h1>
            <div className="answers-div">
                {feed ? <ul className='feed-list'>{list.map((feed) => <li className='feed-list-item' onClick={navQuestion}>
                    User {feed.userEmail} has commented on your question "{feed.questionTitle}".</li>)}</ul> : null }
            </div>
        </div>
    )
}

export default UserFeed;