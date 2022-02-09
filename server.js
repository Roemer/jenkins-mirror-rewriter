const http = require('http');
const url = require('url');

const axios = require('axios');

const requestListener = async function (req, res) {
  const urlObject = url.parse(req.url, true)
  const queryObject = urlObject.query;

  if (urlObject.pathname === '/update-center.json') {
    console.log("Getting json for version: " + queryObject.version);

    const mirrorBaseUrl = process.env.MIRROR_BASE_URL;
    const updateFileUrl = "https://updates.jenkins.io" + "/update-center.json?version=" + queryObject.version;

    // Get the original file
    const response = await axios.get(updateFileUrl);

    // Fixes
    let data = response.data.replace(/https:\/\/updates\.jenkins\.io\//g, mirrorBaseUrl + "/");

    // Write the response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}

const server = http.createServer(requestListener);
server.listen(8080);
