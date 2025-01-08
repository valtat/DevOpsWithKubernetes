const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;

let currentStatus = {
    timestamp: "",
    randomString: ""
}

const logRandomString = () => {

    const randomString = Math.random().toString(36).substring(2, 15);
    const currentDate = new Date().toLocaleString();

    console.log(currentDate, randomString);

    currentStatus = {
        timestamp: currentDate,
        randomString: randomString
    };

    fs.appendFile('data/log_output.txt', JSON.stringify(currentStatus) + '\n', (err) => {
        if (err) {
            console.log('Error writing to file');
        }
    });

    setTimeout(logRandomString, 5000);
}

logRandomString();

app.get('/status', (req, res) => {
    res.json(currentStatus);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
