const promiseReduce = ((asyncFunctions = [], reduce, initialValue = 1) => {
  const result = asyncFunctions.reduce((total, fun) => {
    return total.then(
      async (res) => {
        try {
          reduce(res, await fun())
        } catch (e) {
          console.warm(`${fun.name} failed with ${e}`)
        }
      }
    )
  }, Promise.resolve(initialValue))

  return result;
})

module.exports = promiseReduce;