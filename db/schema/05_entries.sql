DROP TABLE IF EXISTS entries CASCADE;
CREATE TABLE "entries" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "participant_id" integer,
  "competition_id" integer
);