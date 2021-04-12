CREATE TABLE "judges" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "email" varchar(255),
  "phone" varchar(255),
  "event_id" integer
);