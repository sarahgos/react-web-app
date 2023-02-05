import React from "react";
import './Headings.css';

// Headings component
function Heading(props) {
    return (
        <div className="headings">
            <h1 className="heading">{props.text}</h1>
        </div>
    )
}

export default Heading;