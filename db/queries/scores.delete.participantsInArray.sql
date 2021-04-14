DELETE FROM scores USING entries
WHERE scores.entry_id = entries.id
AND entries.competition_id = $1
AND (participant_id = ANY ($2))