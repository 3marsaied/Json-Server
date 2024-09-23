const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Make sure this file contains a "user" array
const middlewares = jsonServer.defaults();

// Require the routes in your routes.json file
const routes = require('./routes.json');

// Use the routes
server.use(jsonServer.rewriter(routes));

server.use(middlewares);
server.use(jsonServer.bodyParser); // Add body parser to handle POST requests

// Add the login route handling code
server.post('/api/auth/login', (req, res) => {
  const users = router.db.get('user').value(); // Get the user data from db.json
  const { username, password } = req.body; // Extract username and password from the request body

  // Find a user with matching username and password
  const foundUser = users.find((user) => user.username === username && user.password === password);

  if (foundUser) {
    // Return the access token if the user is found
    res.json({
      access_token: foundUser.accessToken,
    });
  } else {
    // Return an error response if the username and password don't match
    res.status(401).json({
      error: "Invalid username or password",
    });
  }
});

server.use(router); // Use the default router

// Start the server
const port = process.env.PORT || 3080;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
