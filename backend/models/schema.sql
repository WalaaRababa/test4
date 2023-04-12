-- Create a table called **roles** in the database
CREATE TABLE roles (
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a table called **permissions** in the database
CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a table called **role_permission** in the database
CREATE TABLE role_permission (
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id),
  PRIMARY KEY (id)
);

-- Create a table called **users** in the database
CREATE TABLE users(
  id SERIAL NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  age INT,
  country VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (id)
);

-- Create a table called **articles ** in the database
CREATE TABLE articles (
  id SERIAL NOT NULL,
  title VARCHAR(255),
  description TEXT,
  author_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (author_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

-- Create a table called **comments** in the database
CREATE TABLE comments(
  id SERIAL NOT NULL,
  comment TEXT,
  article_id INT,
  commenter_id INT,
  is_deleted SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (commenter_id) REFERENCES users(id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  PRIMARY KEY (id)
);

-- create roles and permessions 
INSERT INTO
  roles (role)
VALUES
  ("Admin");

INSERT INTO
  permissions (permission)
VALUES
  ("CREATE_ARTICLE");

INSERT INTO
  permissions (permission)
VALUES
  ("CREATE_COMMENT");

INSERT INTO
  role_permission (role_id, permission_id)
VALUES
  (1, 1);

INSERT INTO
  role_permission (role_id, permission_id)
VALUES
  (1, 2);