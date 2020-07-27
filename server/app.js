const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
var compression = require('compression')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) { // cors
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'
  );
  next();
});

app.use(router);

// 简单部署
// gzip
app.use(compression());
app.use(express.static('dist'))

app.listen(3001);
