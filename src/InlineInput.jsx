import React from "react";
import { Input } from 'semantic-ui-react';

import './InlineInput.css';

// Used to render the input fields with text on the left.
function InlineInput(props) {
    return (
        <div>
            <h3 className="text">{props.text}</h3>
            <Input className="input-inline" name={props.name} type={props.type} placeholder={props.placeholder} 
            onChange={props.onChange} size={props.size} label={props.label}></Input>
        </div>
    )
}

export default InlineInput;