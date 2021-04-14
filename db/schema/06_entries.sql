CREATE TABLE "entries" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "participant_id" integer,
  "competition_id" integer,
  UNIQUE ("participant_id", "competition_id")
);