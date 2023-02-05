import React from "react";
import { Button } from 'semantic-ui-react';

// Renders a rounded button component
function ButtonRounded(props) {
    return (
        <Button circular size="big" color={props.color} onClick={props.event}>{props.text}</Button>
    )
}

export default ButtonRounded;