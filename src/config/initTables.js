/* ==================================================== */
// Author: Nihal Deb | P2318103 | DAAA/FT/1B/07
// Project: Back-End Web Development CA2
// Filename: initTables.js
// Content: contains sql queries that create the required
// tables in the database
/* ==================================================== */

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require("../services/db");
const bcrypt = require("bcrypt");

//////////////////////////////////////////////////////
// SET NUMBER OF ROUNDS OF HASHING
//////////////////////////////////////////////////////
const saltRounds = 10;

//////////////////////////////////////////////////////
// CHECK IF TABLES CREATED
//////////////////////////////////////////////////////
const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

//////////////////////////////////////////////////////
// DEFINE SQL STATEMENTS
// 
// HASH A DEFAULT VALUE TO 
//////////////////////////////////////////////////////
bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
    DROP TABLE IF EXISTS User, Task, TaskProgress, Hero, Game, Quest, Shop, Inventory, QuestLog, GameLog, Messages;

    CREATE TABLE User (
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
      );
    
    CREATE TABLE Task (
      task_id INT PRIMARY KEY AUTO_INCREMENT,
      title TEXT,
      description TEXT,
      points INT
      );
    
    CREATE TABLE TaskProgress (
      progress_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      task_id INT NOT NULL,
      completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      notes TEXT
      );

    
    INSERT INTO Task (task_id, title, description, points) VALUES
    (1, 'Plant a tree', 'Plant a tree in your neighbourhood or a designated green area. ', '50'),
    (2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone. ', '30'),
    (3, 'Reduce Plastic Usage', 'Commit to using reusable bags and containers. ', '40'),
    (4, 'Energy Conservation', 'Turn off lights and appliances when not in use. ', '25'),
    (5, 'Composting', 'Start composting kitchen scraps to create natural fertilizer. ', '35');
    
    
    
    CREATE TABLE Hero (
      hero_id INT PRIMARY KEY AUTO_INCREMENT,
      hero_name VARCHAR(255) NOT NULL UNIQUE,
      class VARCHAR(255),
      stamina INT,
      experience INT DEFAULT 0
      );
    
    CREATE TABLE Game (
      game_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      hero_id INT DEFAULT 1,
      points INT DEFAULT 0,
      FOREIGN KEY (hero_id) REFERENCES Hero(hero_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
      );
    
    CREATE TABLE Quest (
      quest_id INT PRIMARY KEY AUTO_INCREMENT,
      title TEXT,
      trait VARCHAR(255),
      difficulty INT,
      points INT,
      wait_time INT NOT NULL,
      completed BOOLEAN DEFAULT FALSE
      );
    
    CREATE TABLE Shop (
      item_id INT PRIMARY KEY AUTO_INCREMENT,
      item_name VARCHAR(255),
      description TEXT,
      price INT,
      Remaining INT DEFAULT 5,
      CHECK (Remaining>=0)
      );
    
    CREATE TABLE Inventory (
      inventory_id INT PRIMARY KEY AUTO_INCREMENT,
      item_id INT NOT NULL,
      item_name TEXT,
      item_description TEXT,
      count INT DEFAULT 1
      CHECK (Count>=0),
      FOREIGN KEY (item_id) REFERENCES Shop(item_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
      );
    
    CREATE TABLE GameLog (
      glog_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      game_id INT NOT NULL,
      points INT,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES User(user_id),
      FOREIGN KEY (game_id) REFERENCES Game(game_id)
      );
    
    CREATE TABLE QuestLog (
      qlog_id INT PRIMARY KEY AUTO_INCREMENT,
      game_id INT NOT NULL,
      quest_id INT NOT NULL,
      points INT,
      date TIMESTAMP,
      FOREIGN KEY (game_id) REFERENCES Game(game_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
      FOREIGN KEY (quest_id) REFERENCES Quest(quest_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
      );

    CREATE TABLE Messages (
      message_id INT PRIMARY KEY AUTO_INCREMENT,
      message_text TEXT NOT NULL,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT INTO Hero (hero_id, hero_name, class, stamina) VALUES
    (1, 'Kratos', 'Strength', '90'),
    (2, 'Athena', 'Intelligence', '60'),
    (3, 'Apollo', 'Healing', '100'),
    (4, 'Asclepius', 'Healing', '100'),
    (5, 'Hercules', 'Strength', '70'),
    (6, 'Mercury', 'Speed', '80'),
    (7, 'Minerva', 'Intelligence', '60'),
    (8, 'Hermes', 'Speed', '80');
    
    
    INSERT INTO Quest (quest_id, title, trait, difficulty, points, wait_time) VALUES
    (1, 'Lift a mountain', 'Strength', '4', '60', '10'),
    (2, 'Get 4.0 GPA', 'Intelligence', '5', '100', '15'),
    (3, 'Getting off of vape', 'Healing', '3', '10', '2'),
    (4, 'Lift yo mama', 'Strength', '5', '100', '20'),
    (5, 'Clearing browser history', 'speed', '3', '20', '5'),
    (6, 'Get a job', 'Intelligence', '3', '40', '9'),
    (7, 'Beat the Flash in a 10^7m dash', 'Speed', '4', '70', '12'),
    (8, 'Cure cancer', 'Healing', '5', '1', '1000000'),
    (9, 'Win a game of chess against a psychic', 'Intelligence', '4', '90', '12'),
    (10, 'lift mjolnir', 'Strength', '3', '50', '7'),
    (11, 'Run a marathon in under 2 hours', 'Speed', '2', '30', '4'),
    (12, 'Create a miracle supplement', 'Healing', '1', '10', '1'),
    (13, 'Go window shopping with your bf/gf', 'Strength', '1', '10', '3'),
    (14, 'Solve a rubiks cube', 'Intelligence', '2', '20', '4'),
    (15, 'Get over your ex', 'Healing', '2', '40', '7'),
    (16, 'Pick a food up after it has dropped on the ground', 'Speed', '1', '20', '5'),
    (17, 'Carrying school bag', 'Strength', '2', '50', '6'),
    (18, 'Enroll at RP', 'Intelligence', '1', '0', '1'),
    (19, 'Get a Thai massage', 'Healing', '4', '70', '10'),
    (20, 'Doing homework while the teacher is collecting it', 'Speed', '5', '80', '12');
    
    
    INSERT INTO Shop (item_id, item_name, description, price) VALUES
    (1, 'Stamina Potion', 'Restores 20 stamina points', '10'),
    (2, 'Experience Potion', 'Increases experience level by 1', '20');

    INSERT INTO Messages (message_text, user_id) VALUES
    ("Hello world!", 1),
    ("Yummy!", 2),  
    ("I am the one", 3);
      `;

    pool.query(SQLSTATEMENT, callback);
  }
});