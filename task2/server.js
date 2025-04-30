const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        const outputPath = path.join(__dirname, 'output.txt');
        const writeStream = fs.createWriteStream(outputPath);
        const unzip = zlib.createGunzip();

        req.pipe(unzip).pipe(writeStream);

        writeStream.on('finish', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File received and saved.\n');
        });

        writeStream.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error writing file.\n');
            console.error(err);
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Only POST method is supported.\n');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
