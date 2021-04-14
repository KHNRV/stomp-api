ALTER TABLE "competitions" ADD FOREIGN KEY ("scoring_system_id") REFERENCES "scoring_systems" ("id");

ALTER TABLE "competitions" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "competitions" ADD FOREIGN KEY ("head_judge_id") REFERENCES "judges" ("id");

ALTER TABLE "participants" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "entries" ADD FOREIGN KEY ("participant_id") REFERENCES "participants" ("id");

ALTER TABLE "entries" ADD FOREIGN KEY ("competition_id") REFERENCES "competitions" ("id") ON DELETE CASCADE;

ALTER TABLE "judges_competitions" ADD FOREIGN KEY ("competition_id") REFERENCES "competitions" ("id") ON DELETE CASCADE;

ALTER TABLE "judges_competitions" ADD FOREIGN KEY ("judge_id") REFERENCES "judges" ("id");

ALTER TABLE "judges" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "scores" ADD FOREIGN KEY ("entry_id") REFERENCES "entries" ("id") ON DELETE CASCADE;

ALTER TABLE "scores" ADD FOREIGN KEY ("judge_id") REFERENCES "judges" ("id");