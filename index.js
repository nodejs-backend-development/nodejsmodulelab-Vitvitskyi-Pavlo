const http = require('http');
const url = require('url');
const host = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // true — щоб отримати query як об'єкт
    const query = parsedUrl.query;

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (query.name) {
        res.end(`Hello ${query.name}`);
    } else {
        res.end('You should provide name parameter');
    }
});

   
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
