CREATE TABLE "scoring_systems" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "active" boolean DEFAULT true
);