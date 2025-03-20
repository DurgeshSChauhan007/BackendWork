const http = require('http');
const PORT = 2527;

const server = http.createServer((req, res) => {

    console.log("Inside server body");
    if (req.url == '/' && req.method == 'GET') {
    res.setHeader('Content-type', "text/html");
    // console.log(Object.keys(req));
    console.log(req.url + " " + req.method);
    res.write("<div style='background-color: pink'><h2 style='color: red'>Welcome to node server</h2></div>");
    res.end("<h2>Server has ended.</h2>");
    }

    if (req.url == '/show' && req.method == 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            msg: "successfully hit the api."
        }))
    }

    if (req.url == '/show' && req.method == 'POST') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            msg: "successfully post the api."
        }))
    }

})

server.listen(PORT, () =>{
    console.log('Server is running on ' + PORT);
})
