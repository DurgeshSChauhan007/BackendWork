const http = require('http')
const fs = require('fs').promises;

const server = http.createServer((req, res) => {
    console.log("Server starts");
    console.log(req.url, req.method);

    if (req.url === '/register' && req.method == 'POST') {

        let body = '';
        let arr = [];
        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', async () => {
            const {name, email, password } = JSON.parse(body);
            console.log(name);
            console.log(email);
            console.log(password);

            const fdata = await fs.readFile('student.json', {encoding:'utf-8'});
                    arr = JSON.parse(fdata);
                    console.log(arr);
                    const result = arr.find(ele => ele.email == email);
                    if (result) {
                        res.setHeader('Content-Type', 'application/json');
                        return res.end(JSON.stringify({"message" : 'This is already registered with us, Try other one.'}))
                    }
                    else {
                        arr.push({name, email, password});

                        await fs.writeFile('student.json', JSON.stringify(arr, null, 2));

                        // console.log(body);

                        return res.end(JSON.stringify({"message": "/register api hit successfully!!"}));
                    }

        })
    }

    if (req.url === '/login' && req.method == 'POST') {

        let body = '';
        let arr = [];
        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', async() => {
            const {email, password} = JSON.parse(body);
            const fdata = await fs.readFile('student.json', {encoding: 'utf-8'});
            arr = JSON.parse(fdata);
            console.log(arr);

            const result = arr.find(ele => ele.email == email && ele.password == password);
            if (result) {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({"message" : "Login Successfully"}))
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({"message" : "Not registered"}));
            }
        })


    }
    // res.end('Welcome to the node');
})

const PORT = 4001;

server.listen(PORT, () => {
    console.log(`Server running at address ${PORT}`);
});

