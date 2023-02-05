const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const https = require("https")
const cors = require("cors")
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_API_KEY);

// Finds the public folder and tells that it is used for static files.
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

// Price of subscription
const orderAmount = 500;

app.post('/payment', async (req, res) => {

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: "aud",
        payment_method_types: ['card'],
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.REACT_APP_EMAIL_API_KEY)

app.post('/email', (req,res) => {

    var email = req.body.email
    console.log(email);

    const message = {
        to: email,
        from: 'sarahannegosling@gmail.com',
        subject: 'Welcome to DEV@Deakin',
        html: '<strong>Welcome to the DEV@Deakin mailing list!</strong>',
    }
    sendGrid
        .send(message)
        .then(() => {
            res.send(JSON.stringify("success"));
            console.log('Email sent')
        })
        .catch((error) => {
            res.send(JSON.stringify("failed"));
            console.error(error)
        })
})

app.post('/signup-email', (req,res) => {

    var email = req.body.email
    var confirmationCode = req.body.confirmationCode;

    const message = {
        to: email,
        from: 'sarahannegosling@gmail.com',
        subject: 'Welcome to DEV@Deakin',
        html: `<p>Hello,</p>
        <p>Thankyou for signing up to Dev@Deakin. Please click the below link to confirm your registration.</p>
        <p><a href='http://localhost:3006/confirm/${confirmationCode}'>Click here to confirm signup</a></p>
        <p>Thanks,</p>
        <p>Your Dev@Deakin team</p>`
    }
    sendGrid
        .send(message)
        .then(() => {
            res.send(JSON.stringify("success"));
            console.log('Email sent')
        })
        .catch((error) => {
            res.send(JSON.stringify("failed"));
            console.error(error)
        })
})

//app.listen(8081, function() {
 //   console.log("Server is running on port 8081")
//})


