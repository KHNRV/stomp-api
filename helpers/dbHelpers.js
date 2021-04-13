module.exports = (db) => {
  return {
    events: {
      read: {
        all() {
          const query = {
            text: ` SELECT id, event_code, event_name, email FROM events`,
          };

          return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
        },

        findByEventCode(event_code) {
          const query = {
            text: ` SELECT id, event_code, event_name, email  
                    FROM events
                    WHERE event_code = $1`,
            values: [event_code],
          };

          return db
            .query(query)
            .then((result) => result.rows[0])
            .catch((err) => err);
        },
      },
    },
    competitions: {
      read: {
        filterByEventCode(event_code) {
          const query = {
            text: ` WITH event_id AS (
                            SELECT id
                            FROM events
                            WHERE event_code = $1
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
                    GROUP BY competitions.id;`,
            values: [event_code],
          };

          return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
        },
      },
    },
    scores: {
      read: {
        filterByCompetitionId(competition_id) {
          const query = {
            text: ` SELECT DISTINCT entries.participant_id AS participant_id,
                                judges_competitions.judge_id AS judge_id,
                                scores.value AS score
                    FROM competitions
                    JOIN entries ON entries.competition_id = competitions.id
                    JOIN judges_competitions ON judges_competitions.competition_id = competitions.id
                    LEFT JOIN scores ON entries.id = scores.entry_id
                    WHERE competitions.id = $1
                    AND entries.competition_id = competitions.id
                    AND judges_competitions.competition_id = competitions.id
                    ORDER BY participant_id, judge_id`,
            values: [competition_id],
          };

          return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
        },
      },
    },
  };
};
