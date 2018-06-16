CREATE TABLE IF NOT EXISTS Users(
    User_Id SERIAL PRIMARY KEY,
    Email VARCHAR(180),
    Birthday DATE,
    Point_Balance INT DEFAULT 0,
    phone varchar(15),
    Referred_By INT,
    Company_ID INT,
    Referal_Code VARCHAR(180) NOT NULL UNIQUE,
    Date_Joined TimeStamp,
    name VARCHAR(180),
    Pic_Url TEXT,
    address_1 VARCHAR(100),
    address_2 VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(25),
    zip VARCHAR(10),
    address_type VARCHAR(25),     
    FOREIGN KEY (Company_ID) REFERENCES Company (Company_ID)
);
