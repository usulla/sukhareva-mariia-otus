const fetch = require("node-fetch");

function sendRequest(reqCount, type) {
    const url = 'http://localhost:3003?test=44&test2=45'
    async function requestAsync() {
        fetch(url)
            .then(data => console.log(data))
        reqCount--
    }

    if (type === 'async') {
        while (reqCount) {
            fetch(url)
                .then(data => console.log(data))
            reqCount--
        }
    } else if (type === 'sync') {
        while (reqCount) {
            requestAsync();
        }
    }

}
sendRequest(4, 'async')