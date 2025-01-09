const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const IMAGE_URL = 'https://picsum.photos/1200';
const IMAGE_PATH = path.join(__dirname, 'image.jpg');
const CACHE_DURATION = 60 * 60 * 1000; 

const fetchImage = async () => {
    try {
        const response = await axios({
            url: IMAGE_URL,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(IMAGE_PATH));
        console.log('Image downloaded successfully');
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};

const checkAndFetchImage = () => {
    if(!fs.existsSync(IMAGE_PATH) || (Date.now() - fs.statSync(IMAGE_PATH).mtimeMs) > CACHE_DURATION) {
        fetchImage();
    }
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading page');
            } else {
                res.end(data);
            }
        });
    } else if (req.method === 'GET' && req.url === '/image.jpg') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(IMAGE_PATH).pipe(res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    checkAndFetchImage();
    setInterval(checkAndFetchImage, CACHE_DURATION);
});