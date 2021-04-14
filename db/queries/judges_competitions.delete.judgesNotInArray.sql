DELETE FROM judges_competitions
WHERE competition_id = $1
AND NOT (judge_id = ANY ($2))