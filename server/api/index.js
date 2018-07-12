const routerApi = require('express').Router();

// Create user if id doesn't exist
routerApi.post('/ping', (req, res) => { 
  res.json( {
    id: 123,
  });
});

//  Delete user
routerApi.delete('/delete', (req, res) => { 
  res.json( {
    id: 123,
  });
});

//  Search user by id
routerApi.get('/user/:id ', (req, res) => { 
  res.json( {
    id: 123,
  });
});

// return user's list 
routerApi.get('/users', (req, res) => { 
  res.json( {
    id: 123,
  });
});


module.exports = routerApi;