insert into admincredentials (name, email, img, auth_id)
values($1, $2, $3, $4)
returning *;