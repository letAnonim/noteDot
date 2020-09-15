CREATE DATABASE notedot;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    age TINYINT,
    password VARCHAR(255)
)