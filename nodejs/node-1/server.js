const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const delay = 100;

fs.readFile('index.html', (err, data) => {
    if (err) throw err;

    const server = http.createServer((req, res) => {
        function sendResponse() {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }

        setTimeout(sendResponse, delay);
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});