const routerApi = require('express').Router();
const config = require('config');
const MongoClient = require('mongodb').MongoClient;
const autoIncrement = require("mongodb-autoincrement");


// Create user if id doesn't exist
routerApi.post('/add-user', (req, res) => { 
  const resData = {};
  const status = 200;

  MongoClient.connect(`${config.get('mongodb.host')}:${config.get('mongodb.port')}`, (err, client) => {
    if (!err) {
      autoIncrement.getNextSequence(client.db('testUser'), 'user', 'id', (erri, autoIndex) => {
        const cUser = client.db('testUser').collection('user');
        
        resData.id = autoIndex + 1;
        resData.number = parseInt(Math.random() * 500 + 300);
        
        cUser.insert(resData);
        res.status(status).json(resData);
        client.close();
      });
    } else {
      status = 412;
      resData.msj = 'Not connect';
      res.status(status).json(resData);
    }

    
  });
});

//  Delete user
routerApi.delete('/delete-user/:id', (req, res) => { 
  const resData = {};
  const status = 200;
  
  if (req.params && req.params.id) {
    MongoClient.connect(`${config.get('mongodb.host')}:${config.get('mongodb.port')}`, (err, client) => {
      if (!err) {
        const cUser = client.db('testUser').collection('user');
        cUser.remove({ id: parseInt(req.params.id) }, { justOne: true });
        resData.msj =  'id removed';
        res.status(status).json(resData);
      } else {
        status = 412;
        resData.msj = 'Not connect';
        res.status(status).json(resData);
      }

      client.close();
    });
  } else {
    res.status(400).json({ msj: 'api call invalid'});
  }
});

//  Search user by id
routerApi.get('/user/:userId', (req, res) => {
  const resData = {};
  const status = 200;
  
  MongoClient.connect(`${config.get('mongodb.host')}:${config.get('mongodb.port')}`, (err, client) => {
    if (!err) {
      const cUser = client.db('testUser').collection('user');
      cUser.find({ id: parseInt(req.params.userId) }, { fields: { _id: 0 } }).toArray((err, doc) => {
        res.status(status).json(doc);
        client.close();
      });
    } else {
      status = 412;
      resData.msj = 'Not connect';
      res.status(status).json(resData);
    }
  });
});

// return user's list 
routerApi.get('/users', (req, res) => {
  const resData = {};
  const status = 200;

  MongoClient.connect(`${config.get('mongodb.host')}:${config.get('mongodb.port')}`, (err, client) => {
    if (!err) {
      const cUser = client.db('testUser').collection('user');
      cUser.find({}, { fields: { _id: 0 } }).toArray((err, doc) => {
        res.status(status).json(doc);
        client.close();
      });
    } else {
      status = 412;
      resData.msj = 'Not connect';
      res.status(status).json(resData);
    }
  });
});


module.exports = routerApi;