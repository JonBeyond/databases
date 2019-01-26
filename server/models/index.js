var db = require('../db');

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
      var queryString = 'SELECT messages.objectID, messages.message, messages.createdAt, users.username, rooms.roomname FROM messages, rooms, users ' +
                          'WHERE rooms.id = messages.room AND users.id = messages.user';
      var queryArgs = [];
      var messages = null;
      dbConnection.connect();
      dbConnection.query(queryString, queryArgs, function (err, results) {
        //results is the SQL database return.  What does it look like? An array?
        messages = results;
      })

      dbConnection.end();
      return messages;
    }, 
    post: function (data) { // a function which can be used to insert a message into the database
      /* Expectation of a message:
        {
          username: name, (REQUIRED)
          message: message, (REQUIRED)
          roomname: room (OPTIONAL; if not present. store 'default')
        }
        missing: createdAt = new.Date()
                 objectId => created by the SQL database (primary key).
      */
      let message = JSON.parse(data);
      let statusCode = null;

      if (!message.hasOwnProperty('roomname')) {
        message.roomname = 'default';
      }

      if (!message.hasOwnProperty('username') || !message.hasOwnProperty('message')) {
        statusCode = 400;
      } else { //message is legit
        statusCode = 200;

        
      }

      return statusCode;
      //note: message is in JSON
      // 0) convert message into an object
      // 1) create an INSERT string using es6 ``
      // 2) we need a way to send the INSERT string to the database (dbconnection)
      // question:
      // what if message doesnt contain certain parameters (roomname? username? etc)
      // --> send it as null
      // we need to generate the timestamp


      /* INSERTING process:
       * 1: Query the users table
       * --> If the user does not exist, then we INSERT the new user
       * --> If the user does exist, do not add (skip to SELECT)
       * --> SELECT the new user's ID (fk) and save it to a variable
       * 
       * 2. Same steps as above for the room
       * --> SAVE the roomID (fk)
       * 
       * 3. Post the message using an insert command:
       *  The parameters we need to post are:
       *  1) ObjectID is created by SQL primary key
       *  2) message
       *  3) createdAt (which needs to be created here using Date.now())
       *  4. usedID (which we saved earlier)
       *  5. roomID (which we saved earlier)
       * 
       * Edge case questions:
       *  1) what if a message doesnt have a username specified?
       *  --> REJECT ALWAYS
       *  2) what if a message doesnt have a room specified?
       * --> Create a 'default' 
       *  3) what if a message doesnt have a message?
       * --> REJECT ALWAYS
       */ 



      var queryString = ``;
      dbConnection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });


    }
     
  },

  users: {
    // Ditto as above.
    get: function () {
      //we need to get all users from the SQL database
      //we need to query the database here
      var queryString = 'SELECT users.username FROM users';
      var queryArgs = [];
      var users = null;
      dbConnection.connect();
      dbConnection.query(queryString, queryArgs, function (err, results) {
        users = results;
      })

      dbConnection.end();
      return users;
    },
    post: function () {

    }
  }
};

