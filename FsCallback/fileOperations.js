const fs = require('fs')

function dataWrite() {
    try {
        fs.writeFile('data.txt', "Welcome to FSD Session", () => {
            console.log("Data written successfully.");
        })
    } catch (error) {
        console.log("Error while writing the data", error);
    }
}

function dataRead() {
    fs.readFile('data.txt', (error, data) => {
        if (error) {
            console.log("Error while reading the data" + error);
        }
        console.log(data.toString());
    })
}

function dataAppend() {
    try {
        fs.appendFile('data.txt', "This is append call", () => {
            console.log("append successfully");
        } )
    } catch (error) {
        console.log("Error while appending the data", error);
    }
}

function dataDelete() {
    try {
        fs.unlink('data.txt', (error) => {
            console.log("file deleted");
        })
    } catch (error) {
        console.log("Error while deleting the data", error);
    }
}

const obj = {
    dataWrite: dataWrite,
    dataRead: dataRead,
    dataAppend: dataAppend,
    dataDelete: dataDelete
}

module.exports = obj;