#!/usr/bin/env node

var express = require('express');
var app = express();

var proxy = require('http-proxy').createProxyServer();
proxy.on('error', function (err, req, res) {
  res.writeHead(502, {
    'Content-Type': 'text/plain'
  });
  res.end('The remote API server is down.');
});

app.use('/auth/', function (req, res) {
  proxy.web(req, res, {target: 'http://127.0.0.1:3000/auth/'});
});
app.use('/api/', function (req, res) {
  proxy.web(req, res, {target: 'http://127.0.0.1:3000/franky/api/v2/'});
});
