CREATE TABLE IF NOT EXISTS adminCredentials (
user_id serial primary key,
auth_id text,
name VARCHAR(180),
email text,
img text,
user_role varchar(180),
password_refresh_token varchar(180),
pass_refresh_timeout bigint,
auth_strategy text
);