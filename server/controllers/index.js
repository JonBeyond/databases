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
      req.on('data', (data) => {
        //data is in JSON format here.
        status = models.messages.post(data);
      })
      res.writeHead(status);
      res.end();
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/JSON'});
      var data = models.users.get(); //this will produce all the messages
      res.end(JSON.stringify(data));      
    },
    post: function (req, res) {
      let status = 500;
      req.on('data', (data) => {
        //data is in JSON format here.
        status = models.users.post(data);
      })
      res.writeHead(status);
      res.end();
    }
  }
};

