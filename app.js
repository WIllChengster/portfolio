const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: false })) 

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/')));

app.get('/', (req, res) => {
    res.sendFile('./index.html')
})

app.post('/api/email', (req, res) => {
    console.log(req.body.name);
})

app.listen(PORT, () => {
    console.log("server is listening to:", PORT)
})