const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://damp-plains-96902.herokuapp.com/',
          changeOrigin: true,
        })
      );
}