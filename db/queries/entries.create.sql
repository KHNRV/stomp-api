INSERT INTO entries (participant_id, competition_id)
VALUES ($1, $2)
ON CONFLICT DO NOTHING;