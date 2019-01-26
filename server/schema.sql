DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Messages Table has two fk, room and user.*/
  objectID INTEGER AUTO_INCREMENT PRIMARY KEY,
  message CHAR(255),
  createdAt BIGINT,
  user INTEGER,
  room INTEGER
);

		
CREATE TABLE users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  username CHAR(50)
);

		
CREATE TABLE rooms (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  roomname CHAR(50)
);


ALTER TABLE messages ADD FOREIGN KEY (user) REFERENCES users (id);
ALTER TABLE messages ADD FOREIGN KEY (room) REFERENCES rooms (id);