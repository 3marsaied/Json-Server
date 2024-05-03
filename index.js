const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("routes.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3080; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);

server.listen(port);