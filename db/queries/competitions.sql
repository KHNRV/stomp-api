SELECT  competitions.id, 
        competitions.name, 
        competitions.scoring_system_id, 
        array_agg(DISTINCT entries.participant_id) AS participants,
        array_agg(DISTINCT judges_competitions.judge_id) AS judges,
        competitions.head_judge_id
FROM competitions, entries, judges_competitions
WHERE competitions.event_id = 1
AND entries.competition_id = competitions.id
AND judges_competitions.competition_id = competitions.id
GROUP BY competitions.id;