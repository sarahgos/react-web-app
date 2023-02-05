import React from "react";
import "./Header.css";
import header from "./images/header.jpg";

// Header component.
function Header() {
    return (
        <div>
            <img className="header-image" src={header} alt="University" />
        </div>
    )
}

export default Header;