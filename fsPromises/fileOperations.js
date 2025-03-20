const promise = require('fs').promises;

function dataWrite() {
    promise.writeFile('data.txt', "Hello using fs promises").
    then(() => {
    console.log("Data written successfully.");
    }).catch((err) => {
    console.log("Error while writing the data.", err);
    }).finally(() => {
    console.log("The finally 1 block must be executed.");
})
}

function dataRead() {
    promise.readFile('data.txt').
    then(() => {
        console.log("Data read successfully.");
    }).catch((err) => {
        console.log("Error while reading the data.", err);
    }).finally(() => {
        console.log("The finally 2 block must be executed.");
    })
}

function dataAppend() {
    promise.appendFile('data.txt', "Good work using fs promise").
    then(() => {
        console.log("Data append successfully.");
    }).catch((err) => {
        console.log("Error while appending the data.", err);
    }).finally(() => {
        console.log("The finally 3 block must be executed.");
    })
}

function dataDelete() {
    promise.unlink('data.txt').
    then(() => {
        console.log("Data delete successfully.");
    }).catch((err) => {
        console.log("Error while deleting the data", err);
    }).finally(() => {
        console.log("The finally 4 block must be executed.");
    })
}


async function readFileAsync() {
    const data = await promise.readFile('data.txt', {encoding: 'utf-8'});
    console.log(data);
}

readFileAsync();

const obj = {
    dataRead: dataRead,
    dataWrite: dataWrite,
    dataAppend: dataAppend,
    dataDelete: dataDelete
}

module.exports = obj;




