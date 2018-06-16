CREATE TABLE IF NOT EXISTS userCredentials(
User_Id INT,
username VARCHAR(180) NOT NULL UNIQUE,
password VARCHAR(180) NOT NULL,
License_Number VARCHAR(180),
password_refresh_token varchar(180),
pass_refresh_timeout bigint,
FOREIGN KEY (User_Id) REFERENCES users (User_Id),
auth_strategy text default 'local'
);