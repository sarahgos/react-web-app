import React from "react";
import PaymentPlan from "./PaymentPlan";
import { useNavigate } from 'react-router-dom';
import './PlansPage.css';

// The payment plans on offer.
const PlansPage = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/payment");
    }

    return (
        <div className="plans-div">
            <h1 className='plans-heading'>Choose which subscription plan you would like</h1>
            <PaymentPlan 
                heading="Free Payment Plan"
                price="FREE"
                list1="Unlimited access to questions and posts"
                list2="Secure signup and login"
                list3="Interact with others by posting and answering questions"
                buttontext="Sign up for free subscription"
                />
            <br></br>
            <PaymentPlan 
                heading="Premium Payment Plan"
                price="$5 month"
                list1="Unlimited access to questions and posts"
                list2="Secure signup and login with access to analytics dashboard"
                list3="Customizable features - personalise with themes, colors and content control"
                buttontext="Sign up for premium subscription"
                event={handleClick}
                />
        </div>
    )
}

export default PlansPage;