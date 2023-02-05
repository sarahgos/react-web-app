import React, { useState } from "react";
import { Button } from 'semantic-ui-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import InputField from "./InputField";
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

// Allows user to pay for their selected product.
const PaymentPage = () => {

    const [billingDetails, setBillingDetails] = useState({
        name:'',
        email:'',
        phone:''
    })

    const {name, email, phone} = billingDetails;
    const stripe = useStripe();
    const elements = useElements();
    var clientSecret;
    const navigate = useNavigate();

    // Get inputted details.
    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setBillingDetails ((prevalue) => {
        if (name === 'name')
            return {
                name: value,
                email: prevalue.email,
                phone: prevalue.phone
            }
        if (name === 'email')
            return {
                name: prevalue.name,
                email: value,
                phone: prevalue.phone
            }
        else if (name === 'phone')
            return {
                name: prevalue.name,
                email: prevalue.email,
                phone: value
            }
        })
    }
  
    // Uses Stripe to confirm card payment.
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (elements == null) {
        return;
      }

      await fetch("http://localhost:8081/payment", {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify({
            email: email
        })
      }).then(function(response) {
        return response.json();
        })
        .then(function(responseJson) {
            clientSecret = responseJson.clientSecret;
        })
  
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                name: billingDetails.name,
                email: billingDetails.email,
                phone: billingDetails.phone
            },
        }
      })
      .then(function(result) {
        console.log(result);
        if (result.paymentIntent.status === "succeeded")
            navigate("/payment-success");
      })
    };
  
    return (
        <div className="pay-div">
            <h1 className='pay-heading'>Fill out payment details</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
                <InputField 
                    name = 'name'
                    type = 'name'
                    placeholder = 'Name...'
                    value = {billingDetails.name}
                    onChange = {handleChange}
                />
                <br></br>
            <label htmlFor='email'>Email</label>
                <InputField 
                    name = 'email'
                    type = 'email'
                    placeholder = 'Email...'
                    value = {billingDetails.email}
                    onChange = {handleChange}
                />
                <br></br>
            <label htmlFor='phone'>Phone Number</label>
                <InputField 
                    name = 'phone'
                    type = 'phone'
                    placeholder = 'Phone...'
                    value = {billingDetails.phone}
                    onChange = {handleChange}
                />
                 <br></br>
                 <br></br>
                <CardElement className="card-element" options={{hidePostalCode: true}}/>
                <br></br>
                <br></br>
                <Button onClick={handleSubmit} color='blue' size='large' type="submit" disabled={!stripe || !elements}>
                Pay Now
                </Button>
            </form>
        </div>
    );
  };

export default PaymentPage;