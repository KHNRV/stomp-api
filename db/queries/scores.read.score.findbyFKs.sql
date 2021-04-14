SELECT score
FROM scores
WHERE entry_id = $1
AND judge_id = $2