DROP TABLE IF EXISTS participants CASCADE;
CREATE TABLE "participants" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "bib" integer UNIQUE,
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "email" varchar(255),
  "event_id" integer
);