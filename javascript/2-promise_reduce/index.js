/* Не уверена, что правильно поняла из задания как применить функцию reduce:
должна ли она принимать значение предыдущего промиса или initialValue=1 всегда.
Также не нашла пока решение без Promise.resolve() в качестве начального значения 
Вывод в консоль в итоге такой:
reduce
fn1
reduce
fn2
2 */

const promiseReduce = ((asyncFunctions, reduce, initialValue) => {
    const result = asyncFunctions.reduce((prV, f) => {
        return prV.then(response => {
           reduce(response, initialValue)
           return f()
        })
    }, Promise.resolve())

    return result;
  })
   
  var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
  }
  
  var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
  })
  
  promiseReduce([fn1,fn2], function (memo, value) {
      console.log('reduce') 
      return memo * value
  }, 1) 
  .then(console.log)