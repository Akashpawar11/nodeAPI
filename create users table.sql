CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL,
    name varchar(200) NOT NULL,
    email varchar(200) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  ALTER TABLE users MODIFY id int NOT NULL AUTO_INCREMENT;