const fs = require('fs').promises;

async function dataCopy() {
    try {
        const data = await fs.readFile('StudentData.json', 'utf8');

        await fs.writeFile('UpdatedData.json', data);

        console.log("Data copied successfully. Copied content:\n", data);
    } catch (err) {
        console.log('Error while copying the data:', err);
    } finally {
        console.log("File operation completed.");
    }
}

module.exports = { dataCopy };
