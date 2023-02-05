import React, { useState } from "react";
import { getAuth } from "firebase/auth"
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {

    const [user, setUser] = useState(null);

    const auth = getAuth()
    const navigate = useNavigate();

    useEffect( () => {
        setUser(auth.currentUser);
    }, [])

    const onLogout = () => {
        auth.signOut();
        navigate("/");
    }

    return (
        <div>
            <h1>{user ? user.email : "Not logged in"}</h1>
            <button type="submit" onClick={onLogout}>Logout</button>
        </div>
    )
}

export default Profile;