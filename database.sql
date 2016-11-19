CREATE DATABASE growlog;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id varchar(100),
    google_name varchar(50),
    google_email varchar(50),
    access_token varchar(200),
    refresh_token varchar(200)
);

CREATE table seeds (
  id SERIAL PRIMARY KEY,
  generic varchar(40),
  variety varchar(40),
  family varchar(40),
  orderdate date,
  quantity integer,
  unitsperpack integer,
  quantityunits varchar(15),
  seedsperunit integer,
  manufacturer varchar(40),
  supplier varchar(40),
  daystoharvest int,
  receivedate date,
  lotnumber varchar(20),
  donation boolean DEFAULT false,
  plantouse boolean DEFAULT false
);

CREATE TABLE seedsinuse (
  id SERIAL PRIMARY KEY,
  seeds_id integer REFERENCES seeds,
  transfer boolean DEFAULT false,
  quantity integer
);

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  seedsinuse_id integer REFERENCES seedsinuse,
  field varchar(10),
  section varchar(10),
  row varchar(10)
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
type varchar(40) NOT NULL
);

CREATE TABLE act_loc_users (
  id SERIAL PRIMARY KEY,
  act_id integer NOT NULL REFERENCES activities ON DELETE CASCADE,
  location_id integer NOT NULL REFERENCES location ON DELETE CASCADE,
  users_id integer NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE planted (
  id SERIAL PRIMARY KEY,
  assigndate date,
  plantdate date,
  duration integer,
  act_loc_users_id integer REFERENCES act_loc_users
);

CREATE TABLE water (
  id SERIAL PRIMARY KEY,
  assigndate date,
  completedate date,
  duration integer,
  amount varchar(10),
  status boolean,
  act_loc_users_id integer REFERENCES act_loc_users
);

CREATE TABLE weeding (
  id SERIAL PRIMARY KEY,
  assigndate date,
  completedate date,
  duration integer,
  weedtype varchar(50),
  comments varchar(100),
  act_loc_users_id integer REFERENCES act_loc_users
);

CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  dateofissue date,
  title varchar(100),
  comments varchar(100),
  closed boolean,
  act_loc_users_id integer REFERENCES act_loc_users
);

CREATE TABLE other (
  id SERIAL PRIMARY KEY,
  title varchar(30),
  comments varchar(150),
  act_loc_users_id integer REFERENCES act_loc_users
);

CREATE TABLE harvest (
  id SERIAL PRIMARY KEY,
  projectedharvestdate date,
  actualharvestdate date,
  amountharvested integer,
  amountharvestedunits varchar(10),
  duration integer,
  act_loc_users_id integer REFERENCES act_loc_users
);

-- RUN THIS AFTER YOU CREATE THE TABLES
INSERT INTO activities ("type") VALUES ('plant');
INSERT INTO activities ("type") VALUES ('water');
INSERT INTO activities ("type") VALUES ('weeding');
INSERT INTO activities ("type") VALUES ('issues');
INSERT INTO activities ("type") VALUES ('harvest');
INSERT INTO activities ("type") VALUES ('other');

-- EXAMPLE JOINS QUERY
SELECT * FROM location
JOIN act_loc_users ON location.id = act_loc_users.location_id
JOIN activities ON activities.id = act_loc_users.act_id
JOIN users ON users.id = act_loc_users.users_id;
