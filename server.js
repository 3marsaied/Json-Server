server.post('/api/auth/login', (req, res) => {
    const users = router.db.get('user').value();
    const {username, password} = req.body;
    const user = users.find(user => user.username === username && user.password === password);
  
    if (user) {
      // If the user is found and the password matches, return the user's accessToken
      res.status(200).jsonp({accessToken: user.accessToken});
    } else {
      res.status(401).jsonp({message: 'Invalid username or password'});
    }
  });
  