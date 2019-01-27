var models = require('../models');

// controller
// accepts input from the app for a post or get function

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      res.writeHead(200, {'Content-Type': 'application/JSON'});
      var data = models.messages.get(); //this will produce all the messages
      res.end(JSON.stringify(data));
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      let status = 500;
      status = models.messages.post(req.body);
      res.writeHead(status);
      res.end();
    } 
  },

  users: {
    get: function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/JSON'});
      var data = models.users.get().then((success) => {
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

