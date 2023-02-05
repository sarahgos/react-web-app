import React from "react";
import './PaymentSuccess.css';

// Displayed when a payment has been made successfully.
const PaymentSuccess = () => {
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="h1-success">Payment was successful, thankyou for becoming a premium member!</h1>
        </div>
    )
}

export default PaymentSuccess;