export const fetchData = async (url, success, fail, configs = {}) => {
  await fetch(url, configs)
    .then(async res => {
      if(res.status >= 400)
        throw new Error(await res.json())

      return res.json()
    })
    .then(
      async (result) => {
        await success(result)
      }
    )
    .catch(
      async (error) => await fail(error)
    )
}