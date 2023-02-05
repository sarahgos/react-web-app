import React from "react";
import { Input, Header } from 'semantic-ui-react';

import './InputBox.css';

// Renders an input box with heading at the top and is height adjustible.
function InputBox(props) {
    return (
        <div>  
            <Header as='h3'>{props.heading}</Header>
            <Input className="input-box" placeholder={props.placeholder} style={props.style}
            name={props.name} type={props.type} onChange={props.onChange} label={props.label}></Input>
        </div>
    )
}

export default InputBox;