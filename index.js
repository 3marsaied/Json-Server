const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Require the routes in your routes.json file
const routes = require('./routes.json');

// Use the routes
server.use(jsonServer.rewriter(routes));

server.use(middlewares);
server.use(jsonServer.bodyParser); // Add this line

// Add the login route handling code
server.post('/api/auth/login', (req, res) => {
  const users = router.db.get('user').value();
  const {username, password} = req.body;
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.status(200).jsonp({accessToken: user.accessToken});
  } else {
    res.status(401).jsonp({message: 'Invalid username or password'});
  }
});

server.use(router);

const port = process.env.PORT || 3080;
server.listen(port, () => {
  console.log('JSON Server is running');
});
