SELECT  competitions.id, 
        competitions.name, 
        competitions.scoring_system_id, 
        array_agg(DISTINCT entries.participant_id) AS participants,
        array_agg(DISTINCT judges_competitions.judge_id) AS judges,
        competitions.head_judge_id,
        competitions.event_id
FROM competitions, entries, judges_competitions
WHERE competitions.id = $1
GROUP BY competitions.id