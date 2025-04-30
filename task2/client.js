const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt'); // файл, який буде надіслано

const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/octet-stream'
    }
};

const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`Response from server: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

const gzip = zlib.createGzip();
const readStream = fs.createReadStream(filePath);

readStream.pipe(gzip).pipe(req);
