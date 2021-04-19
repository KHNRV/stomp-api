SELECT  competitions.id, 
        competitions.name, 
        competitions.scoring_system_id, 
        array_remove(array_agg(DISTINCT entries.participant_id), NULL) AS participants,
        array_remove(array_agg(DISTINCT judges_competitions.judge_id), NULL) AS judges,
        competitions.head_judge_id
FROM competitions
FULL OUTER JOIN entries ON (competitions.id = entries.competition_id)
FULL OUTER JOIN judges_competitions ON (competitions.id = judges_competitions.competition_id)
WHERE competitions.event_id = $1
GROUP BY competitions.id;