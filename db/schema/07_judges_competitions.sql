CREATE TABLE "judges_competitions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "competition_id" integer,
  "judge_id" integer,
  UNIQUE ("competition_id", "judge_id")
);