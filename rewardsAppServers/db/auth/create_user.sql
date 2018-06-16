insert into users(email, name, birthday, phone, referal_code, date_joined)
values($1, $3, $4, $5, (select create_uid()), now());
insert into usercredentials(user_id, username, password, license_number)
values((select User_id from users where email = $1), $1, $2, $6);
