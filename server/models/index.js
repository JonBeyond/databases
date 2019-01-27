var db = require('../db');
var mysql = require('mysql');

// model
// this file interacts with the database

var dbConnection = mysql.createConnection({
      user: 'student',
      password: 'student',
      database: 'chat'
});

module.exports = {
  messages: { // a function which produces all the messages
    get: function () {
      //we need to get all messages from the SQL database
      //we need to query the database here
      
      let queryString = 'SELECT messages.objectID, messages.message, messages.createdAt, users.username, rooms.roomname FROM messages, rooms, users ' +
                          'WHERE rooms.id = messages.room AND users.id = messages.user;';
      let queryArgs = [];
      let messages = null;
      // dbConnection.connect();
      dbConnection.query(queryString, queryArgs, function (err, results) {
        //results is the SQL database return.  What does it look like? An array?
        messages = results;
      })

      // dbConnection.end();
      return messages;
    }, 
    post: function (data) { // a function which can be used to insert a message into the database
      let message = data;
      let statusCode = null;
      message.createdAt = Date.now(); 

      if (!message.hasOwnProperty('roomname')) {
        message.roomname = 'default';
      }

      if (!message.hasOwnProperty('username') || !message.hasOwnProperty('message')) {
        statusCode = 400;
      } else { //message is legit
        statusCode = 200;
        var queryString = `SELECT username FROM users WHERE users.username = '${message.username}';`;
        var queryArgs = [];
        var insertString = '';
        var queryResult = null;
        var userID = null;

        //query for the current user
        //(if it exists, there will be an array with one value, otherwise empty)

        queryString = `SELECT users.id FROM users WHERE users.username = '${message.username}';`;
        
        dbConnection.query(queryString, queryArgs, function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log(results);
            userID = results[0].id; //????? might need to fix this
            console.log(`userID is ${userID}`);
          }
        });

      return statusCode;
      }
    },
  },

  users: {
    // Ditto as above.
    get: function () {
      //we need to get all users from the SQL database
      //we need to query the database here
      var queryString = 'SELECT users.username FROM users;';
      var queryArgs = [];
      var users = null;
      return new Promise((resolve,reject) => {
        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            reject(err);
          } else {
            console.log(JSON.stringify(results));
            resolve(results);
          }
        });
      });
    },
    post: function (message) {
      var queryString = `SELECT username FROM users WHERE users.username = '${message.username}';`;
      var queryArgs = [];
      var queryResult = null;
      dbConnection.query(queryString, queryArgs, function (err, results) {
          if (err) console.log(err);
          queryResult = results;
          if (queryResult.length === 0) {
              insertString = `INSERT INTO users (username) VALUES ('${message.username}');`;
              dbConnection.query(insertString, queryArgs, function (err, results) {
                if (err) console.log(err);
              });
          };
      });
      return 201;
   }
  }
}