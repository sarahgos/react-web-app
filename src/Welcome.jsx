import React from "react";
import { useParams } from "react-router-dom";
import { findUserWithConfirmation } from "./utils/firebase";
import { useNavigate } from 'react-router-dom';

// Component used when user signs up and clicks on verification email link.
const Welcome = () => {

    let params = useParams();
    const code = params.confirmationCode;
    const navigate = useNavigate();

    const getCode = async() => {

        await findUserWithConfirmation(code);
        navigate('/login');
    };

    getCode();

    return (
        <div>
        </div>
    )
}

export default Welcome;