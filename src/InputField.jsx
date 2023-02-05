import React from "react";
import { Input } from 'semantic-ui-react';

// Componenent to render an input field.
const InputField = (props) => {
    return (
            <div>
               <Input name={props.name} type={props.type} placeholder={props.placeholder} 
               onChange={props.onChange} size={props.size} label={props.label} style={props.style}/>
           </div>
    );
}

export default InputField