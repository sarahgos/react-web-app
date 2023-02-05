import React from "react";
import { Button, Container } from 'semantic-ui-react';

// Used to render the post button.
function ButtonPost() {
    return (
        <div>
            <Container textAlign="right">
                <Button size="huge">Post</Button>
            </Container>
        </div>
    )
}

export default ButtonPost;