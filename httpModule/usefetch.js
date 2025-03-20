const http = require('http');
const PORT = 2527;

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    try {
        const data = await fetch("https://fakestoreapi.com/products");
        const jsondata = await data.json();

        console.log(jsondata[0].category); 

        const htmltemplate = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Online Shop</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }
                h1 {
                    background-color: #222;
                    color: white;
                    padding: 15px;
                    margin: 0;
                }
                .first {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin: 20px;
                    gap: 20px;
                }
                .second {
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    width: 280px;
                    padding: 15px;
                    text-align: center;
                    transition: transform 0.3s;
                }
                .second:hover {
                    transform: scale(1.05);
                }
                .second img {
                    width: 100%;
                    height: auto;
                    border-bottom: 2px solid #ddd;
                    padding-bottom: 10px;
                }
                .category {
                    font-weight: bold;
                    font-size: 18px;
                    color: #333;
                    margin: 10px 0;
                }
                .description {
                    font-size: 14px;
                    color: #555;
                    height: 60px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .price {
                    font-size: 20px;
                    font-weight: bold;
                    color: #e44d26;
                    margin-top: 10px;
                }
                .btn {
                    display: inline-block;
                    background: #e44d26;
                    color: white;
                    padding: 10px 15px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 10px;
                }
                .btn:hover {
                    background: #d43f1b;
                }
            </style>
        </head>
        <body>
            <h1>🛒 Online Shop</h1>
            <div class="first">
                ${
                    jsondata.map(ele => {
                        return (`
                            <div class="second">
                                <img src="${ele.image}" alt="Product">
                                <div class="category">${ele.category} (ID: ${ele.id})</div>
                                <div class="description">${ele.description.substring(0, 80)}...</div>
                                <div class="price">Rs.${ele.price}</div>
                                <a href="#" class="btn">Buy Now</a>
                            </div>
                        `);
                    }).join('') 
                }
            </div>
        </body>
        </html>`;

        res.end(htmltemplate);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.end("<h1>Failed to fetch products. Please try again later.</h1>");
    }
});

server.listen(PORT, () => {
    console.log("Server is running on --> " + PORT);
});
