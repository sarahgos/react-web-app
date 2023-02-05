import React, {useState} from "react";
import InputField from "./InputField";
import Button from "./ButtonSquare";
import { findUserWithEmail } from "./utils/firebase";

// Used to reset a users password.
const PasswordReset = () => {

    const [emailSent, setEmailSent] = useState();
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState(false);

    // Set the email.
    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setEmail ((prevalue) => {
        if (name === 'email')
            return {
                email: value
            }
        })
    }

    // Find user with email and reset password.
    const getEmail = async() => {
        findUserWithEmail(email.email);
    };

    return (
        <div className='login-outer-div'>
        <div className='login-div'>

            <br></br>
        
            { emailSent ? null : <div><h2 className='login-heading'>Enter your email to reset password</h2>
            
            <br></br>

            <div>
                <label htmlFor='email'>Email</label>
                <InputField 
                name = 'email'
                type = 'text'
                placeholder = 'Email...'
                onChange = {handleChange}
                value = {email}
                />
            </div>

            <br></br>
            
            <br></br>

            <Button type='submit' color='teal' size='large' text='Reset Password' event={getEmail}></Button></div>
        }

        { success ? <div><h2>You have been sent an email to confirm password change. Please check your email to continue.</h2></div> : null }
        </div>
        </div>
    );
}

export default PasswordReset;