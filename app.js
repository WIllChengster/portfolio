const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const path = require('path');

app.use(express.static(path.join(__dirname + '/')));

app.get('/', (req, res) => {
    res.sendFile('./index.html')
})

app.use(express.static(path.join(__dirname + '/mm')));

app.get('/memory_match', (req, res) => {
    res.sendFile(__dirname + '/mm/index.html')
} )

app.listen(PORT, () => {
    console.log("server is listening to:", PORT)
})