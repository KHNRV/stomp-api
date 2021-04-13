module.exports = (db) => {
  return {
    events: {
      read: {
        id: {
          findByEventCode(event_code) {
            const query = {
              text: ` SELECT id
                      FROM events
                      WHERE event_code = $1
                      `,
              values: [event_code],
            };

            return db
              .query(query)
              .then((result) => result.rows[0].id)
              .catch((err) => err);
          },
        },
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
        filterByEventId(event_id) {
          const query = {
            text: ` SELECT  competitions.id, 
                            competitions.name, 
                            competitions.scoring_system_id, 
                            array_agg(DISTINCT entries.participant_id) AS participants,
                            array_agg(DISTINCT judges_competitions.judge_id) AS judges,
                            competitions.head_judge_id
                    FROM competitions, entries, judges_competitions
                    WHERE competitions.event_id = $1
                    AND entries.competition_id = competitions.id
                    AND judges_competitions.competition_id = competitions.id
                    GROUP BY competitions.id;`,
            values: [event_id],
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
                                scores.score_value AS score
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
    participants: {
      read: {
        filterByEventId(event_id) {
          const query = {
            text: ` SELECT id, bib, first_name, last_name, email, phone
                    FROM participants
                    WHERE event_id = $1;`,
            values: [event_id],
          };

          return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
        },
        findById(id) {
          const query = {
            text: ` SELECT id, bib, first_name, last_name, email, phone, event_id
                    FROM participants
                    WHERE id = $1;`,
            values: [id],
          };

          return db
            .query(query)
            .then((result) => result.rows[0])
            .catch((err) => err);
        },
      },
      create(event_id, participant) {
        const { bib, first_name, last_name, email, phone } = participant;
        const query = {
          text: ` INSERT INTO participants (bib, first_name, last_name, email, phone, event_id)
                  VALUES ($1, $2, $3, $4, $5, $6);`,
          values: [bib, first_name, last_name, email, phone, event_id],
        };

        return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
      },
      update(participant_id, participant) {
        const { bib, first_name, last_name, email, phone } = participant;
        const query = {
          text: ` UPDATE participants
                  SET bib = $1,
                      first_name = $2,
                      last_name = $3,
                      email = $4,
                      phone = $5
                  WHERE id = $6;`,
          values: [bib, first_name, last_name, email, phone, participant_id],
        };

        return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
      },
    },
    judges: {
      read: {
        filterByEventId(event_id) {
          const query = {
            text: ` SELECT id, first_name, last_name, email, phone
                    FROM judges
                    WHERE event_id = $1;`,
            values: [event_id],
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
