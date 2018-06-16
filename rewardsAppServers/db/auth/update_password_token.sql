update usercredentials
set password_refresh_token = $2,
password_refresh_timeout = $3
where username = $1;