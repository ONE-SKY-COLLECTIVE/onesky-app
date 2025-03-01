
-- Table to store user information
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  email_verified TIMESTAMP,
  image VARCHAR(255)
);

-- Table to store account information
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  provider VARCHAR(255),
  provider_account_id VARCHAR(255),
  refresh_token VARCHAR(255),
  access_token VARCHAR(255),
  access_token_expires TIMESTAMP
);

-- Table to store session information
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  session_token VARCHAR(255) UNIQUE,
  user_id INTEGER REFERENCES users(id),
  expires TIMESTAMP
);

-- Table to store verification tokens
CREATE TABLE verification_tokens (
  identifier VARCHAR(255),
  token VARCHAR(255),
  expires TIMESTAMP
);
