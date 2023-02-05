import React from 'react';
import './App.css';
import HomePage from './HomePage';
import Navigation from './Navigation';
import Login from './Login';
import SignUp from './SignUp';
import {Routes, Route} from 'react-router-dom';
import Profile from './Profile';
import SelectPost from './SelectPost';
import QuestionsPage from './QuestionsPage';
import PlansPage from './PlansPage';
import PaymentPage from './PaymentPage';
import PaymentSuccess from './PaymentSuccess';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PostTutorial from './PostTutorial';
import Tutorials from './Tutorials';
import Articles from './Articles';
import Welcome from './Welcome';
import PasswordReset from './PasswordReset';
import Footer from './Footer';
import ArticleDetail from './ArticleDetail';
import TutorialDetail from './TutorialDetail';
import UserFeed from './UserFeed';

const stripePromise = loadStripe('pk_test_51LnVXxJ24zPd1frL4199FKpLRQ9ITzZUOM4O8g6nGGLiDtf6bxYxMJNgWu5pPjobhAuKyDJtokNH9jgD5YYXfBfX008Y2QyS1z');

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation />}>
            <Route index element={<HomePage />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/post' element={<SelectPost />}/>
            <Route path='/questions' element={<QuestionsPage />}/>
            <Route path='/plans' element={<PlansPage />}/>
            <Route path='/payment' element={<Elements stripe={stripePromise}>{<PaymentPage />}</Elements>}/>
            <Route path='/payment-success' element={<PaymentSuccess />}/>
            <Route path='/post-tutorial' element={<PostTutorial />}/>
            <Route path='/tutorials' element={<Tutorials />}/>
            <Route path='/articles' element={<Articles />}/>
            <Route path="/confirm/:confirmationCode" element={<Welcome />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/article-detail" element={<ArticleDetail />} />
            <Route path="/tutorial-detail" element={<TutorialDetail />} />
            <Route path="/user-feed" element={<UserFeed />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
