const express = require('express');
const app = express();
const port = 3002;

app.get("/", (req, res) => {
    res.send("Welcome to Express Server.")
})

app.listen(port, (req, res) => {
    console.log('Express server is running on :: ' + port);
});