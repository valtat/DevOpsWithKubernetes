const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

let pongCounter = 0;

app.get('/pingpong', (req, res) => {
    pongCounter++;
    res.json({ pong: pongCounter });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});