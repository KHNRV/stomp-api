WITH event_id AS (
        SELECT id
        FROM events
        WHERE event_code = 'csc2020'
)
SELECT  competitions.id, 
        competitions.name, 
        competitions.scoring_system_id, 
        array_agg(DISTINCT entries.participant_id) AS participants,
        array_agg(DISTINCT judges_competitions.judge_id) AS judges,
        competitions.head_judge_id
FROM competitions, entries, judges_competitions
WHERE competitions.event_id = event_id
AND entries.competition_id = competitions.id
AND judges_competitions.competition_id = competitions.id
GROUP BY competitions.id;