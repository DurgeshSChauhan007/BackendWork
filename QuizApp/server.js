const http = require("http");
const fs = require("fs").promises;
const PORT = 2972;

const server = http.createServer(async (req, res) => {
    console.log("Server starts here...");
    console.log(req.url, req.method);

    let arr = [];
    let fdata = "";

    try {
        fdata = await fs.readFile("quiz.json", { encoding: "utf-8" });
        arr = fdata ? JSON.parse(fdata) : [];
    } catch (error) {
        console.log("File not found or empty, initializing with an empty array.");
        arr = [];
    }

    if (req.url === "/users" && req.method === "GET") {
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(arr));
    }

    if (req.url.startsWith("/users/") && req.method === "GET") {
        const id = req.url.split("/")[2];
        const user = arr.find((ele) => ele.id === id);
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(user || { message: "User not found" }));
    }

    if (req.url === "/createuser" && req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            const { id, user, email } = JSON.parse(body);

            const result = arr.find((ele) => ele.email === email);
            if (result) {
                res.setHeader("Content-Type", "application/json");
                return res.end(
                    JSON.stringify({ message: "This email is already registered." })
                );
            }

            arr.push({ id, user, email });

            await fs.writeFile("quiz.json", JSON.stringify(arr, null, 2));
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ message: "User created successfully!" }));
        });
    }

    if (req.url.startsWith("/edituser/") && req.method === "PATCH") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            const id = req.url.split("/")[2];
            const updateData = JSON.parse(body);
            const userIndex = arr.findIndex((ele) => ele.id === id);

            if (userIndex === -1) {
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ message: "User not found" }));
            }

            arr[userIndex] = { ...arr[userIndex], ...updateData };

            await fs.writeFile("quiz.json", JSON.stringify(arr, null, 2));
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ message: "User updated successfully!" }));
        });
    }

    if (req.url.startsWith("/deleteuser/") && req.method === "DELETE") {
        const id = req.url.split("/")[2];
        const filteredArr = arr.filter((ele) => ele.id !== id);

        if (filteredArr.length === arr.length) {
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({ message: "User not found" }));
        }

        await fs.writeFile("quiz.json", JSON.stringify(filteredArr, null, 2));
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ message: "User deleted successfully!" }));
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Invalid API request" }));
});

server.listen(PORT, () => {
    console.log(`Server running at address http://localhost:${PORT}`);
});
