const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const port = process.env.PORT || 8000;

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

app.listen(port, () => {
  console.log('Example app listening on port ' + port);
});
