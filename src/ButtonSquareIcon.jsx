import React from "react";
import { Button, Icon } from 'semantic-ui-react';

// Renders a square button with an icon.
function ButtonSquareIcon(props) {
    return (
        <Button icon labelPosition={props.labelPosition} size="large" color={props.color} onClick={props.event}><Icon name={props.icon}></Icon>{props.text}</Button>
    )
}

export default ButtonSquareIcon;