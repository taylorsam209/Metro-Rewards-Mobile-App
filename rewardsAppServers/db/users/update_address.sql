update users
set address_1 = $2,
    address_2 = $3,
    city = $4,
    state = $5,
    zip = $6,
    address_type = $7
where user_id = $1
