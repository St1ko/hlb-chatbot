const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const production = process.env.PROD || false;
const port = production ? 80 : 8000;

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'client/scss'),
    dest: path.join(__dirname, 'client'),
    debug: true,
    outputStyle: 'compressed'
  })
);

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
);

if (production) {
  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/chatbot.stijnalbert.nl/privkey.pem',
    'utf8'
  );
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/chatbot.stijnalbert.nl/cert.pem',
    'utf8'
  );
  const ca = fs.readFileSync(
    '/etc/letsencrypt/live/chatbot.stijnalbert.nl/chain.pem',
    'utf8'
  );

  const credentials = { key: privateKey, cert: certificate, ca: ca };

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    console.log('HTTPS app listening on port 433');
  });
}

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log('HTTP app listening on port ' + port);
});
