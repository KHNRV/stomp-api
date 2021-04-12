CREATE TABLE "events" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "event_code" varchar(255) UNIQUE NOT NULL,
  "event_name" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL
);
