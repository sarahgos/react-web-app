import React, {useState} from 'react'
import InputField from './InputField';
import Button from './ButtonSquare';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth, logout } from './utils/firebase';
const { v4: uuidv4 } = require('uuid');

const SignUp = () => {

    var confirmationCode = '';

    const [contact, setContact] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'', 
    })

    const {firstName, lastName, email, password, confirmPassword} = contact;
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value}= event.target;

        setContact ((prevalue) => {
        return {
            ...prevalue,
            [name]: value
        }
        })
    }

    // Handles sign up form submission.
    const handleSubmit = async(event) => {
        
        event.preventDefault();

        if (password !== confirmPassword)
        {
            alert('Passwords do not match!');
            return;
        }

        confirmationCode = uuidv4();

        await fetch ('http://localhost:8081/signup-email', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                email: email,
                confirmationCode: confirmationCode
            })
        })
        .then (response => response.json())
        .then((data) => {
          /*  if (data === "success")
            {
                setSuccess(true);
                setFailed(false);
            }

            if (data === "failed")
            {
                setFailed(true);
                setSuccess(false);
            }})*/})
        .catch(err => {   
            console.log("Error: " + err)  
        })
    
        try
        {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth (user, {firstName, lastName, confirmationCode});
            navigate("/login");
        }
        catch (error)
        {
            console.log('error in creating user.', error.message);
        }
    }

    return (
        <div className='signup-outer-div'>
        <div className='signup-div'>

            <br></br>

            <h2 className='login-heading'>Create a DEV@Deakin Account</h2>

            <br></br>

            <div >
                <label htmlFor="firstName">First name*</label>
                <InputField 
                name = 'firstName'
                type = 'text'
                placeholder = 'First name...'
                onChange = {handleChange}
                value = {contact.firstName}
                />
            </div>

            <br></br>

            <div >
                <label htmlFor="lastName">Last name*</label>
                <InputField 
                name = 'lastName'
                type = 'text'
                placeholder = 'Last name...'
                onChange = {handleChange}
                value = {contact.lastName}
                />
            </div>

            <br></br>

            <div>
                <label htmlFor='email'>Email*</label>
                <InputField 
                name = 'email'
                type = 'email'
                placeholder = 'Email...'
                onChange = {handleChange}
                value = {contact.email}
                />
            </div>

            <br></br>
            <br></br>

            <div>
                <label htmlFor='password'>Password*</label>
                <InputField 
                name = 'password'
                type = 'password'
                placeholder = 'Password...'
                onChange = {handleChange}
                value = {contact.password}
                />
            </div>

            <br></br>

            <div>
                <label htmlFor='confirmPassword'>Confirm password*</label>
                <InputField 
                name = 'confirmPassword'
                type = 'password'
                placeholder = 'Confirm password...'
                onChange = {handleChange}
                value = {contact.confirmPassword}
                />
            </div>

            <br></br>
            <br></br>

            <Button color='teal' text='Sign Up' event={handleSubmit}></Button>

        </div>
        </div>
    );
}

export default SignUp