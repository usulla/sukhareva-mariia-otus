const http = require('http')
const hostname = '127.0.0.1'
const port = 3003
let contentType = 'text/html'

const server = http.createServer((req, res) => {
    let isWaiting = false
    if (req && !isWaiting) {
        isWaiting = true;
        setTimeout(function() {
            console.log(7878);
            res.writeHead(200, {
                'Content-Type': contentType
            })
            isWaiting = false;
            res.end('Hello123')
        }, 4000)
    }
})

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})