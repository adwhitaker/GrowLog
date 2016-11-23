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
  quantity integer,
  plantedassigndate date,
  plantdate date,
  plantduration integer,
  projectedharvestdate date,
  actualharvestdate date,
  amountharvested integer,
  amountharvestedunits varchar(10),
  harvestduration integer
);

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  field varchar(10),
  section varchar(10),
  row varchar(10)
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  type varchar(40) NOT NULL,
  assigndate date,
  completedate date,
  duration integer,
  amount varchar(10),
  weedtype varchar(50),
  title varchar(100),
  comments varchar(100)
);

CREATE TABLE act_loc_users (
  id SERIAL PRIMARY KEY,
  act_id integer NOT NULL REFERENCES activities ON DELETE CASCADE,
  location_id integer NOT NULL REFERENCES location ON DELETE CASCADE,
  users_id integer NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE seeds_in_use_loc (
id SERIAL PRIMARY KEY,
seedsinuse_id integer NOT NULL REFERENCES seedsinuse ON DELETE CASCADE,
location_id integer NOT NULL REFERENCES location ON DELETE CASCADE
);

-- EXAMPLE JOINS QUERY
SELECT * FROM location
JOIN act_loc_users ON location.id = act_loc_users.location_id
JOIN activities ON activities.id = act_loc_users.act_id
JOIN users ON users.id = act_loc_users.users_id;
