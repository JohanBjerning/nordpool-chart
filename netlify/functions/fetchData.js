const axios = require('axios');

exports.handler = async (event, context) => {
  let api_url = process.env.API_URL;
  let api_token = process.env.API_TOKEN;
  
  const res = await axios.get(api_url, {
    headers: {
      "Authorization":  "Bearer " + api_token
    }
  }).catch(console.log("error"));  

  const data = res.data;
  

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
} 