CREATE TABLE "scores" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "entry_id" integer,
  "judge_id" integer NOT NULL,
  "score" integer NOT NULL,
  UNIQUE ("entry_id", "judge_id")

);