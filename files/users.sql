CREATE DATABASE users;

USE users;

CREATE TABLE users (
	id int(11) NOT NULL auto_increment,
	name varchar(100) NOT NULL,
	age int(3) NOT NULL,
	email varchar(100) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO users (id, name, age, email) VALUES (1, 'Harley', 33, 'harley@gmail.com');
INSERT INTO users (id, name, age, email) VALUES (2, 'John', 27 ,'john@gmail.com');
INSERT INTO users (id, name, age, email) VALUES (3, 'Bob', 40 ,'bob@gmail.com');
INSERT INTO users (id, name, age, email) VALUES (4, 'Jane', 18 ,'jane@gmail.com');
INSERT INTO users (id, name, age, email) VALUES (5, 'Wesley', 20 ,'wesley@gmail.com');

SELECT * FROM users;