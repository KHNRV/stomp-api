DROP TABLE IF EXISTS competitions CASCADE;
CREATE TABLE "competitions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "scoring_system_id" integer,
  "event_id" integer,
  "head_judge_id" integer
);