const fs = require('fs').promises;
const http = require('http');

const PORT = 2527;

const server = http.createServer(async (req, res) => {
    // try {
    //     res.setHeader('Content-Type', 'text/html');
    //     res.write("Welcome to HTTP and FS module");

    //     const data = await fs.readFile('student.json', { encoding: 'utf-8' });
    //     res.write(`<h2 style='color:cyan'>${data}</h2>`);
    // } catch (err) {
    //     console.log("Error while reading file:", err);
    //     res.write("<h2 style='color:red'>Error while reading file</h2>");
    // }

    // Route Handling
    if (req.url === '/home' && req.method === "GET") {
        try {
            res.setHeader('Content-Type', 'text/html');
            const htmlTemplate = await fs.readFile('Home.html');
            res.end(htmlTemplate);
        } catch (err) {
            console.log("Error while reading home.html:", err);
            res.end("<h2 style='color:red'>Error loading home page</h2>");
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h2 style='color:red'>404 - Page Not Found</h2>");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on -> ${PORT}`);
});
