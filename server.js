const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const app = express();

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'client/scss'),
    dest: path.join(__dirname, 'client'),
    debug: true,
    outputStyle: 'compressed' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
);

app.listen(8000, () => {
  console.log('Example app listening on port 8000');
});
