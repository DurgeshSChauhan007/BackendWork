const fs = require('fs');

function dataWrite() {
    try {
        fs.writeFileSync("data.txt", "Hello Node Js using fs module");
        console.log("data written successfully.")
    }
    catch(error) {
        console.log("Error while writing the data.", error);
    }
}

function dataRead() {
    try {
        const rf = fs.readFileSync('data.txt', {encoding:'utf-8'});
        console.log(rf);
    } catch (error) {
        console.log("Error while reading the data.", error);
    }
}

function dataAppend() {
    
    try {
        fs.appendFileSync('data.txt', " appending using fs module");
        console.log("data append successfully");
    } catch (error) {
        console.log("Error while appending the file", error);
    }
    
}

function fileDelete() {

    try {    
    fs.unlinkSync('data.txt');
    console.log("file deleted successfully");
    } catch (error) {
        console.log("Error while deleting the file", error);
    }
}

const obj = {
    dataRead: dataRead,
    dataWrite: dataWrite,
    dataAppend: dataAppend,
    fileDelete: fileDelete
}

module.exports = obj;
