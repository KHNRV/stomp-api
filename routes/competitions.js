const competitions = require("express").Router({ mergeParams: true });

module.exports = (db) => {
  competitions.get("/", (req, res) => {
    const event_code = req.params.event_code;
    db.events.read.id
      .findByEventCode(event_code)
      .then((event_id) => db.competitions.read.filterByEventId(event_id))
      .then(async (competitions) => {
        for (const competition of competitions) {
          competition.scores = await db.scores.generate.scoreObjects(
            competition.id,
            competition.participants,
            competition.judges
          );
        }
        res.json(competitions);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ status: "error", message: err });
      });
  });

  competitions.post("/", (req, res) => {
    const event_code = req.params.event_code;
    const competition = req.body;
    let event_id;

    db.events.read.id
      .findByEventCode(event_code)
      .then((id) => {
        event_id = id;
        return db.competitions.create(event_id, competition);
      })
      .then(() => db.competitions.read.filterByEventId(event_id))
      .then(async (competitions) => {
        for (const competition of competitions) {
          competition.scores = await db.scores.generate.scoreObjects(
            competition.id,
            competition.participants,
            competition.judges
          );
        }
        res.json(competitions);
      })
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });
  competitions.put("/:competition_id", async (req, res) => {
    try {
      const { event_code, competition_id } = req.params;
      const competition = req.body;

      console.log("competition", competition);
      const event_id = await db.events.read.id.findByEventCode(event_code);
      const targetCompetition = await db.competitions.read.findById(
        competition_id
      );

      if (targetCompetition.event_id === event_id) {
        await db.competitions.update(competition_id, competition);
        await db.entries.delete.participantsNotInArray(
          competition_id,
          competition.participants
        );
        await db.judges_competitions.delete.judgesNotInArray(
          competition_id,
          competition.judges
        );

        for (const participant_id of competition.participants) {
          await db.entries.create(participant_id, competition_id);
          console.log("Participant #", participant_id);
        }

        for (const judge_id of competition.judges) {
          await db.judges_competitions.create(judge_id, competition_id);
          console.log("Judge #", judge_id);
        }

        await db.scores.delete.participantsInArray(
          competition_id,
          competition.participants
        );

        for (const score of competition.scores) {
          if (Number.isInteger(score.score)) {
            const entry_id = await db.entries.read.id.findByFKs(
              score.participant_id,
              competition_id
            );
            console.log("entry_id #", entry_id);
            await db.scores.create(entry_id, score.judge_id, score.score);
          }
        }

        const competitions = await db.competitions.read.filterByEventId(
          event_id
        );
        for (const competition of competitions) {
          competition.scores = await db.scores.generate.scoreObjects(
            competition.id,
            competition.participants,
            competition.judges
          );
        }
        res.json(competitions);
      }
    } catch (err) {
      res.json(err);
      console.log(err);
    }
  });
  competitions.delete("/:competition_id", (req, res) => {
    const { event_code, competition_id } = req.params;
    let event_id;

    db.events.read.id
      .findByEventCode(event_code)
      .then((id) => {
        event_id = id;
        return db.competitions.read.findById(competition_id);
      })
      .then((competition) => {
        if (competition.event_id === event_id) {
          return db.competitions.delete(competition_id);
        } else {
          return res.status(401).json({
            status: "error",
            message: "You don't have authorization to perform that action",
          });
        }
      })
      .then(() => db.competitions.read.filterByEventId(event_id))
      .then(async (competitions) => {
        for (const competition of competitions) {
          competition.scores = await db.scores.generate.scoreObjects(
            competition.id,
            competition.participants,
            competition.judges
          );
        }
        res.json(competitions);
      })
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });

  return competitions;
};
