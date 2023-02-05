import React, { useContext, useState } from "react";
import { Input } from 'semantic-ui-react';
import{Link, Outlet} from 'react-router-dom';
import { getAuth, onAuthStateChanged, SAMLAuthProvider } from "firebase/auth";
import { UserContext } from "./contexts/user.context";
import "./Navigation.css";
import { useEffect } from "react";

// Navigation component.
function Navigation() {

    const {currentUser, setCurrentUser, removeCurrentUser} = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState();

    // Logout current user
    const logout = () => {
        auth.signOut();
        removeCurrentUser();
    }

    const auth = getAuth();

    useEffect(() => {
        // Check whether user logged in.
        onAuthStateChanged(auth, (user) => {
            if (user) {
            setLoggedIn(true);
            }
            else {
                setLoggedIn(false);
            }
        });
    }, [])

    return (
        <div>
            <ul className="nav-ul">
                <Link to='/' className="nav-left">Dev@Deakin</Link>
                <Input className="nav-input" icon="search" placeholder="Search..."/>
                {loggedIn ? <Link to='/' className="nav-right" onClick={logout}>Logout</Link> :
                    <Link to='/login' className="nav-right">Login</Link>}
                <Link to='/post' className="nav-right">Post</Link>
                <Link to='/questions' className="nav-right">Questions</Link>   
                <Link to='/plans' className="nav-right">Plans</Link>
                {loggedIn ? <Link to='/user-feed' className="nav-right">My Feed</Link> : null}
            </ul>
            {loggedIn ? <h5 className='greeting'>{auth.currentUser.email}</h5> : null}   
            <br></br> 

            <Outlet />
        </div>
    )
}

export default Navigation;