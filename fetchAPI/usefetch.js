const http = require('http');
const PORT = 2527;
const server = http.createServer(async(req, res) => {
    res.setHeader('Content-Type', 'text/html');
    const data = await fetch('https://fakestoreapi.com/products');
    console.log(data);
    res.end("Hii");
})

server.listen(PORT, () => {
    console.log("Server is running on -- ", PORT);
})