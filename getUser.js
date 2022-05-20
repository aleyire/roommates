const axios = require("axios")

const getUser = async () => {
  const { data } = await axios.get("https://randomuser.me/api/")
  return data.results
}

module.exports = getUser
