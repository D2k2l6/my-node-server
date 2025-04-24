const fs = require('fs');
const path = require('path');

// Path to the data file
const dataFilePath = path.join(__dirname, 'data.json');

// Function to check and create the file if it doesn't exist
const initializeDataFile = () => {
    if (!fs.existsSync(dataFilePath)) {
        const initialData = {
            movies: [
                {
                    id: 1682345678901,
                    title: "Inception",
                    director: "Christopher Nolan",
                    releaseYear: 2010
                }
            ]
        };
        fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
        console.log('data.json file created successfully.');
    } else {
        console.log('data.json file already exists.');
    }
};

// Function to read data from the file
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        initializeDataFile();
    }
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};

// Function to write data to the file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Export the functions
module.exports = {
    initializeDataFile,
    readData,
    writeData
};