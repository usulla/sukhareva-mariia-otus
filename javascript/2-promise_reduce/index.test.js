const promiseReduce = require('./index.js');

describe('works with promises', () => {
    const fn1 = () => {
        console.log('fn1')
        return Promise.resolve(2)
    }
    const fn2 = () => new Promise(resolve => {
        console.log('fn2') 
        setTimeout(() => resolve(3), 1000)
    })
    const fn3 = () => {
        console.log('fn3')
        return Promise.resolve(4)
    }
    const fn4 = () => new Promise(resolve => {
        console.log('fn4')
        setTimeout(() => resolve(5), 1000)
    })
    test('mult 2 * 3 to equal 6', () => {
        return promiseReduce([fn1, fn2], function (memo, value) {
            console.log('reduce')
            return memo * value
        }, 1).then(data => {
            expect(data).toBe(6);
        })
    })
    test('mult 4 * 5 to equal 20', async () => {
        const data = await promiseReduce([fn3, fn4], function (memo, value) {
            console.log('reduce')
            return memo * value
        }, 1);
        expect(data).toBe(20);
    })
})