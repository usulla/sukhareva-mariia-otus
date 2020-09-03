const http = require('http');

const args = process.argv.slice(2);
const n = args[0] ? args[0] : 1;
const type = args[1] ? args[1] : 'sync';
let chain = Promise.resolve();

for (let i = 1; i <= n; i++) {
    if (type === 'async') {
        promisifiedRequest().then((response) => {
            console.log(response);
        });
    } else {
        chain = chain
            .then(promisifiedRequest)
            .then((response) => {
                console.log(response);
            });
    }
}

function promisifiedRequest() {
    return new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:3000`, (response) => {
            if (response.statusCode === 200) {
                return resolve(`ok`);
            } else {
                return reject(`${response.statusCode}`);
            }
        });
    });
}