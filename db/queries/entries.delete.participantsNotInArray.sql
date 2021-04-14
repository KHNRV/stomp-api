DELETE FROM entries
WHERE competition_id = $1
AND NOT (participant_id = ANY ($2))