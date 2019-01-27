/*
        if (queryResult.length === 0 || queryResult[0].username !== message.username) {
            insertString = `INSERT INTO users (username) VALUES (${message.username});`;
            dbConnection.connect();

            dbConnection.query(insertString, queryArgs, function (err, results) {
              if (err) {
                console.log(err);
              }
            });

            dbConnection.end();
          }


        // grab userID from the table:
        queryString = `SELECT users.id FROM users WHERE user.name = ${message.username};`;
        var userID = null;//tbd from SELECT

        dbConnection.query(queryString, queryArgs, function (err, results) {
          if (err) {
            console.log(err);
          } else {
            userID = results[0]; //????? might need to fix this
          }
        });

        // 2: query the rooms table
        // add it if it doesnt exist

        queryString = `SELECT rooms.roomname FROM rooms WHERE rooms.roomname = ${message.roomname};`;

        dbConnection.query(queryString, queryArgs, function (err, results) {
          if (err) {
            throw new Error;
          } else if (results[0].roomname && results[0].roomname === message.roomname) {
            //do nothing
          } else {
            insertString = `INSERT INTO rooms roomname VALUES ${message.roomname};`;
            dbConnection.query(insertString, queryArgs, function (err, results) {
              if (err) {
                throw new Error;
              }
            });
          }
        });

        var roomID = null; //tbd from SELECT

        dbConnection.query(queryString, queryArgs, function (err, results) {
          if (err) {
            throw new Error;
          } else {
            roomID = results[0]; //????? might need to fix this
          }
        });

        // 3. insert the message into the messages table
        // need to send:

        insertString = `INSERT INTO messages (message, createdAt, user, room) VALUES 
              (${message.message}, ${message.createdAT}, ${userID}, ${roomID});`

        dbConnection.query(insertString, queryArgs, function (err, results) {
          if (err) {
            throw new Error;
          }
        });             

        dbConnection.end();

      }
*/