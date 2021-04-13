SELECT DISTINCT entries.participant_id AS participant_id,
                judges_competitions.judge_id AS judge_id,
                scores.value AS score
FROM competitions
JOIN entries ON entries.competition_id = competitions.id
JOIN judges_competitions ON judges_competitions.competition_id = competitions.id
LEFT JOIN scores ON entries.id = scores.entry_id
WHERE competitions.id = 1
AND entries.competition_id = competitions.id
AND judges_competitions.competition_id = competitions.id
ORDER BY participant_id, judge_id