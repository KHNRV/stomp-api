CREATE TABLE "competitions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "scoring_system_id" integer,
  "event_id" integer NOT NULL,
  "head_judge_id" integer
);