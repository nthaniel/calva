DROP DATABASE IF EXISTS calva;
CREATE DATABASE calva;

\c calva;

CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR
);

CREATE TABLE artists (
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    website VARCHAR,
    email VARCHAR,
    address VARCHAR,
    phone VARCHAR,
    bio VARCHAR,
    nationality VARCHAR,
    notes VARCHAR
);

CREATE TABLE sellers (
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    website VARCHAR,
    email VARCHAR,
    address VARCHAR,
    phone VARCHAR,
    notes VARCHAR
);

CREATE TABLE buyers (
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    website VARCHAR,
    email VARCHAR,
    address VARCHAR,
    phone VARCHAR,
    notes VARCHAR
);

CREATE TABLE art_objects (
    ID SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    medium VARCHAR,
    subject VARCHAR,
    art_type VARCHAR,
    place_created VARCHAR,
    date_created DATE,
    date_purchased DATE,
    status VARCHAR DEFAULT 'New Art',
    cost INT DEFAULT 0,
    value INT DEFAULT 0,
    price INT,
    tags JSONB,
    description VARCHAR,
    history VARCHAR,
    location VARCHAR,
    notes VARCHAR,
    sale_notes VARCHAR,
    thumbnail1 VARCHAR,
    thumbnail2 VARCHAR,
    thumbnail3 VARCHAR,
    thumbnail4 VARCHAR,
    thumbnail5 VARCHAR,
    image1 VARCHAR,
    image2 VARCHAR,
    image3 VARCHAR,
    image4 VARCHAR,
    image5 VARCHAR,
    artist_id INT REFERENCES artists ON DELETE SET NULL,
    seller_id INT REFERENCES sellers ON DELETE SET NULL,
    buyer_id INT REFERENCES buyers ON DELETE SET NULL,
    user_id INT REFERENCES users ON DELETE SET NULL
);