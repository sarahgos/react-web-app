import React, { Component } from "react";
import { Radio } from 'semantic-ui-react';
import Question from "./PostQuestion";
import Article from "./PostArticle";
import './SelectPost.css';

// Class to conditionally render which post type is selected.
export default class SelectPost extends Component {

    state = {}
    clicked = false;
    
    handleChange = (event, { value }) => this.setState({ value }) 
    renderPost = (event, { clicked }) => this.setState({ clicked: true }) 

    render() {
        return (
            <div className="select-post-div">

                <h3 className="select-h3">Select Post Type: </h3>

                <Radio className="radio" 
                    name="radio" 
                    label="Question" 
                    value={true}
                    checked={this.state.value === true}
                    onChange={this.handleChange}  
                    onClick={this.renderPost}
                />

                <Radio
                    name="radio"
                    label="Article" 
                    value={false}
                    checked={this.state.value === false}
                    onChange={this.handleChange}
                    onClick={this.renderPost}
                />

                <h2 className="select-heading">What do you want to ask or share?</h2>
                {this.state.clicked ? <div>{this.state.value ? <Question/> : <Article/>}</div> : null}

            </div>
        )
    }
}
