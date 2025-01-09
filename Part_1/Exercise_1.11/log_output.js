const express = require('express');
const app = express();
const fs = require('fs');
const crypto = require('crypto')

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const currentDate = new Date().toLocaleString();

    currentStatus = {
        timestamp: currentDate,
        randomString: randomString
    };

    hashData = crypto.createHash('sha256').update(JSON.stringify(currentStatus)).digest('hex');
    

    let pingPongCount
    
    fs.readFile('data/ping_pong_count.txt', 'utf8', (err, data) => {
        if(err) throw err;

        console.log(data);

        pingPongCount = data

        const response = `${currentDate}: ${hashData}\nPing / Pongs: ${pingPongCount}`;
        res.send(response);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
