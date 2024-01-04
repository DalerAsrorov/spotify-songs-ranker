export const createHttpCall = (data, timer = 3000) =>
  new Promise((res) => {
    setTimeout(() => {
      res(data)
    }, timer)
  })
