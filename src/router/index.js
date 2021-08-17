const   express = require('express'),
        app = express(),
        mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        flash = require('connect-flash'),
        Email = require('../models/email'),
        router = new express.Router();

const dotenv = require('dotenv');
dotenv.config();
const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY, process.env.MJ_SECRETKEY)

router.get('/', (req, res) => {
    res.render('index')
})


// New User Registration
router.post('/contact', async (req, res) => {
    const email = {
        name: req.body.name + ' - ' + req.body.email,
        subject: req.body.subject,
        recipient: process.env.RECEIVER_EMAIL,
        sender: process.env.SENDER_EMAIL,
        message: req.body.message,
    };
    console.log(email);
    const createdEmail = new Email(email);
    await createdEmail.save().then(response => {
        console.log(response);
        res.send('Successful!');
        const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages":[{
                    "From": {
                        "Email": email.sender,
                        "Name": email.name
                    },
                    "To": [{
                        "Email": email.recipient,
                        "Name": "Emmanuel Olusola"
                    }],
                    "Subject": email.subject,
                    "TextPart": email.message,
                    "HTMLPart": email.message
                }]
            })
        request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err)
        })
    }).catch(e => {
        res.send(e)
        console.log(e)
    })
})


module.exports = router;