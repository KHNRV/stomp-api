DROP TABLE IF EXISTS scores CASCADE;
CREATE TABLE "scores" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "entry_id" integer,
  "judge_id" integer NOT NULL,
  "value" integer NOT NULL
);