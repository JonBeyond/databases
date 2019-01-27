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

      return new Promise((resolve, reject) => {
        dbConnection.query(queryString, queryArgs, function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }, 
    post: function (message) { // a function which can be used to insert a message into the database
      let statusCode = null;
      message.createdAt = Date.now(); 

      if (!message.hasOwnProperty('roomname')) {
        message.roomname = 'default';
      }
      console.log("Sending message: " + JSON.stringify(message));
      if (!message.hasOwnProperty('username') || !message.hasOwnProperty('message')) {
        return 400;

      } else { //message is legit
        var queryArgs = [];
        var insertString = '';
        var queryResult = null;
        var userID = null;
        var roomID = null;
        var queryString = null;

        return new Promise((resolve, reject) => {
          queryString = `SELECT users.id FROM users WHERE users.username = '${message.username}';`;
          dbConnection.query(queryString, queryArgs, function (err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results[0].id);
            }
          });
        }).then((result) => {
          userID = result;
          return new Promise((resolve, reject) => {
              var queryString = `SELECT id FROM rooms WHERE rooms.roomname = '${message.roomname}';`;
              var queryArgs = [];
              dbConnection.query(queryString, queryArgs, function (err, results) {
                  if (err) {
                    reject(err);
                  } else {
                    if (results.length !== 0) {
                      resolve(results[0].id);
                    } else {
                      insertString = `INSERT INTO rooms (roomname) VALUES ('${message.roomname}');`;
                      dbConnection.query(insertString, queryArgs, function (err) {
                        if (err) {
                          reject(err);
                        } else {
                          //we need to query to get the new roomID
                          //and then we can resolve   
                          dbConnection.query(queryString, queryArgs, function (err, results) {
                            if (err) {
                              reject(err);
                            } else {
                              resolve(results[0].id);
                            }
                          });
                        }
                      });
                    }
                  }
              })
          }).then((result) => {
            roomID = result;
            insertString = `INSERT INTO messages (message, createdAt, user, room) VALUES ('${message.message}', ${message.createdAt}, ${userID}, ${roomID});` //hardcoding ${roomID} as 1;
            dbConnection.query(insertString, queryArgs, function (err) {
              if (err) {
                console.log(err);
              }
            });             
        });
        
      });
    }
  }
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
