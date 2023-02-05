import React from "react";
import ButtonSquare from "./ButtonSquare";
import './PaymentPlan.css';

// Component to display payment plan options.
const PaymentPlan = (props) => {
    return (
        <div className="payment-plan-div">
            <h2 className="plan-heading">{props.heading}</h2>
            <h1>{props.price}</h1>
            <h3 className="plan-subheading">Features</h3>
            <ul className="plan-ul">
                <li className="plan-li">
                    {props.list1}
                </li>
                <li className="plan-li">
                    {props.list2}
                </li>
                <li className="plan-li">
                    {props.list3}
                </li>
            </ul>
            <ButtonSquare text={props.buttontext} color='teal' event={props.event}></ButtonSquare>
        </div>
    )
}

export default PaymentPlan;