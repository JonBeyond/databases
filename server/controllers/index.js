var models = require('../models');

// controller
// accepts input from the app for a post or get function

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      res.writeHead(200, {'Content-Type': 'application/JSON'});
      models.messages.get().then((success) => {
        res.end(JSON.stringify(success));
      }) //this will produce all the messages
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      let status = 500;
      models.messages.post(req.body).then(() => {
        res.writeHead(201);
        res.end();
      })
    } 
  },

  users: {
    get: function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/JSON'});
      models.users.get().then((success) => {
          res.end(JSON.stringify(success));      
        });
    },
    post: function (req, res) {
      let status = 500;
      status = models.users.post(req.body);
      res.writeHead(status);
      res.end();
    }
  }
};

