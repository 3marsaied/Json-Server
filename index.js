const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Require the routes in your routes.json file
const routes = require('./routes.json');

// Use the routes
server.use(jsonServer.rewriter(routes));

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3080;
server.listen(port, () => {
  console.log('JSON Server is running');
});
