const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(
//         '/',
//         createProxyMiddleware({
//           target: 'https://damp-plains-96902.herokuapp.com/',
//           changeOrigin: true,
//         })
//       );
// }

// Local Dev
module.exports = function(app) {
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'https://localhost:5000/',
        changeOrigin: true,
      })
    );
}