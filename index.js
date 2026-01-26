const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your db.json file
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public')
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running');
});
