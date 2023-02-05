import React, { Fragment } from "react";
import { Input } from 'semantic-ui-react';
import './QuestionPage.css';
import QuestionCardList from './QuestionCardList';
import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

// Parent component for the questions list. 
const QuestionsPage = () => {

    const [searchTerm , setSearchTerm] = useState('')
  
    // Used to filter question list.
    function onSearchChange(event)
    {
      setSearchTerm(event.target.value)
    }

    return (
      
      <div>
        <div className="question-div">
            <h1 className='question-heading'>Questions</h1>
            <h4>Enter a search term then select whether to search tags, title, question or date</h4>
            <Input 
                className="nav-input" 
                icon="search" 
                placeholder="Search..."
                type="text"
                value = {searchTerm}
                onChange = {onSearchChange}
                />

        </div>
        <div>
          <ErrorBoundary>

                  <Fragment>
                <QuestionCardList searchQuestions= {searchTerm} />
              </Fragment>

          </ErrorBoundary>
        </div>
      </div>
      
    );
}

export default QuestionsPage;