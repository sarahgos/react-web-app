import React, { useState, useEffect, useContext } from 'react'
import './Login.css';
import Button from './ButtonSquare';
import ButtonIcon from './ButtonSquareIcon'
import { Link, useNavigate } from 'react-router-dom';
import { loginUserWithEmailAndPassword, signInWithGooglePopup, createUserDocFromGoogle } from './utils/firebase';
import InputField from './InputField';
import { UserContext } from './contexts/user.context';

// Component to login user.
const Login = () => {

    const [contact, setContact] = useState({
        email:'',
        password:''
    })

    const {email, password} = contact;
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(0);
    const [confirmMsg, setConfirmMsg] = useState(0);
    const {currentUser, setCurrentUser} = useContext(UserContext);

    useEffect(() => {
        if (currentUser.currentUser)
        {
            navigate("/");
        }
    }, [currentUser.currentUser]);

    // Login user with Google.
    const logGoogleUser = async () => {
        const user = await signInWithGooglePopup();
        setCurrentUser(user);
        const userDocRef = await createUserDocFromGoogle(user);
        console.log(userDocRef);
    }

    // Login user.
    const loginUser = async() => {

        const user = await loginUserWithEmailAndPassword(email, password);
        console.log(user);

        if (user === 'auth/user-not-found' || user === 'auth/wrong-password') {
            setErrorMsg(true);
        }
        else if (user === undefined) {
            setConfirmMsg(true);
        }
        else {
            setCurrentUser(user);
        }
    }

    // Set the email and password.
    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setContact ((prevalue) => {
        if (name === 'email')
            return {
                email: value,
                password: prevalue.password
            }
        else if (name === 'password')
            return {
                email: prevalue.email,
                password: value
            }
        })
    }

    return (
        <div className='login-outer-div'>
        <div className='login-div'>

            <br></br>

            <h2 className='login-heading'>Login to your DEV@Deakin account</h2>
            
            <br></br>

            <div>
                <label htmlFor='email'>Email</label>
                <InputField 
                name = 'email'
                type = 'text'
                placeholder = 'Email...'
                onChange = {handleChange}
                value = {contact.email}
                />
            </div>

            <br></br>

            <div>
                <label htmlFor='password'>Password</label>
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
                {errorMsg? <h4 className='error-msg'>Username or password is incorrect</h4>: <h4></h4>}
                {confirmMsg? <h4 className='error-msg'>User not found, ensure you have confirmed sign up via email</h4>: <h4></h4>}
            </div>
            <br></br>

            <Button type='submit' color='teal' size='large' text='Login' event={loginUser}></Button>

            <br></br>
            <br></br>
            <ButtonIcon labelPosition='left' icon='google' type='submit' color='blue' size='large' text='Login with Google' event={logGoogleUser}></ButtonIcon>

            <br></br>

            <h4>Don't have an account?</h4>

            <Link to='/signup' className='login-link'>
                Sign Up Instead
            </Link>
            
            <h4>Forgotten your password?</h4>

            <Link to='/reset-password' className='login-link'>
                Reset Password
            </Link>

        </div>
        </div>
    );
}

export default Login