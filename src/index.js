import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import { QuestionProvider } from './contexts/question.context';
import { UserProvider } from './contexts/user.context';
import { ArticleProvider } from './contexts/article.context';
import { TutorialProvider } from './contexts/tutorial.context';
import ErrorBoundary from './ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <UserProvider>
        <ArticleProvider>
          <TutorialProvider>
            <QuestionProvider>
                <App />
            </QuestionProvider>
          </TutorialProvider>
        </ArticleProvider>
      </UserProvider>
    </ErrorBoundary>
  </BrowserRouter>
);

