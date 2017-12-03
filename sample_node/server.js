const http = require('http');
const fs = require('fs');
const settings = require('./settings');
const path = require('path');
const pug = require('pug');
const qs = require('querystring');

const server = http.createServer();
const compiledFunction = pug.compileFile(path.join(__dirname, '/public_html/pug.pug'));

let posts = {name: 'mamao'};

const renderForm = (posts, res) => {
  const data = compiledFunction(posts);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(data);
  res.end();
}

server.on('request', (req, res) => {
  if (req.method === 'POST') {
    req.data = '';
    req.on('readable', () => {
      req.data += req.read() || '';
    });
    req.on('end', () => {
      const query = qs.parse(req.data);
      posts.push(query.name);
      renderForm(posts, res);
    });
  } else {
    console.log(posts);
    renderForm(posts, res);
  }

});
server.listen(settings.port, settings.host);
console.log('server listening...');
