import React from "react";
import { Button } from 'semantic-ui-react';

// Renders a square button component.
function ButtonSquare(props) {
    return (
        <Button size="large" color={props.color} onClick={props.event}>{props.text}</Button>
    )
}

export default ButtonSquare;