const http = require("http");
const axios = require('axios')

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
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
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: 'error',
      message: e.message
    }));
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
