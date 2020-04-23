const promiseReduce = ((asyncFunctions, reduce, initialValue) => {
  const result = asyncFunctions.reduce((total, fun) => {
    return total.then(
      async (res) => reduce(res, await fun())
    )
  }, Promise.resolve(initialValue))

  return result;
})

module.exports = promiseReduce;