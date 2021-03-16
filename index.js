const http = require("http");
const axios = require('axios')

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(`${req.method} ${req.url}`);
  try {
    const apiRes = await axios({
      method: 'get',
      url: `https://www.autoscout24.ch${req.url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res.statusCode = 200;
    res.end(JSON.stringify(apiRes.data));
  } catch (e) {
    console.error(e);
    res.statusCode = e.response.status;
    res.end(JSON.stringify({
      status: 'error',
      message: e.response.statusText,
      description: e.response.data.Message
    }));
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
