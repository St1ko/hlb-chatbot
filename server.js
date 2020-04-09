const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const port = process.env.PORT || 8000;
const production = process.env.PROD || false;

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
  const key = fs.readFileSync(
    path.join(__dirname, 'sslcert', 'selfsigned.key')
  );
  const cert = fs.readFileSync(
    path.join(__dirname, 'sslcert', 'selfsigned.crt')
  );
  const credentials = { key: key, cert: cert };

  const server = https.createServer(credentials, app);
  server.listen(port, () => {
    console.log('HTTPS app listening on port ' + port);
  });
} else {
  app.listen(port, () => {
    console.log('HTTP app listening on port ' + port);
  });
}
