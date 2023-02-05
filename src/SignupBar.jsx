import React, {useState } from "react";
import { Input, Button } from 'semantic-ui-react';
import "./SignupBar.css";

// For users to sign up to the mailing list.
function SignupBar() {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const handleChange = (event) => {
        setEmail(event.target.value);
        console.log(email);
    }

    const formSubmit = async(event) => {
        event.preventDefault();

        await fetch ('http://localhost:8081/email', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                email: email
            })
        })
        .then (response => response.json())
        .then((data) => {
            if (data === "success")
            {
                setSuccess(true);
                setFailed(false);
            }

            if (data === "failed")
            {
                setFailed(true);
                setSuccess(false);
            }})
        .catch(err => {   
            console.log("Error: " + err)  
        })
    }

    return (
        <div>
            <br></br>
            <div className='signup-bar'>
                <div className="signup-left">
                    <h1 className="sign-up-text">SIGN UP FOR OUR DAILY INSIDER</h1>
                </div>
                <div>
                    <Input value={email} onChange = {handleChange} className='signup-input' placeholder="Enter your email"/>
                </div>
                <div className="signup-right">
                    <Button onClick={formSubmit} type="submit" color="black">Subscribe</Button>
                </div>
            </div>
            
            {success ? <div><h3 className="welcome-text">Thankyou for signing up to Dev@Deakin newsletter, we've sent you a welcome email!</h3></div> : null}
            {failed ? <div><h3 className='error-text'>There was an error in signing up, please try again.</h3></div> : null}
        </div>
    )
}

export default SignupBar;