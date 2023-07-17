// ref: https://www.twilio.com/ja/blog/node-js-proxy-server-jp

const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT ?? 3000;
const PROXY_PATH = process.env.PROXY_PATH ?? '/';
const HOST = "localhost";
const API_SERVICE_URL = process.env.API_SERVICE_URL;

// Logging
app.use(morgan('dev'));

// Proxy endpoints
app.use(PROXY_PATH, createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^${PROXY_PATH}`]: '',
  },
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
