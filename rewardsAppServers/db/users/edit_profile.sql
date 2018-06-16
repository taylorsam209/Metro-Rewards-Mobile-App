update users
set name = $2,
    email = $3,
    phone = $4,
    birthday = $5
    where user_id = $1;
update usercredentials
set username = $3
where user_id = $1;