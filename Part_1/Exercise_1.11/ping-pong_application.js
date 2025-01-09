const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;

let pongCounter = 0;

app.get('/pingpong', (req, res) => {
    pongCounter++;
    fs.writeFileSync('data/ping_pong_count.txt', pongCounter.toString());
    res.send(`Ping / Pongs: ${pongCounter}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});