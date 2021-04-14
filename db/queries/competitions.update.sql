UPDATE competitions
SET name = $1,
    scoring_system_id = $2,
    head_judge_id = $3
WHERE id = $4;