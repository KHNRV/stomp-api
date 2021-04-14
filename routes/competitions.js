const competitions = require("express").Router({ mergeParams: true });

module.exports = (db) => {
  competitions.get("/", (req, res) => {
    const event_code = req.params.event_code;
    db.events.read.id
      .findByEventCode(event_code)
      .then((event_id) => db.competitions.read.filterByEventId(event_id))
      .then(async(competitions) => {
        for (const competition of competitions) {
          competition.scores = await db.scores.read.filterByCompetitionId(
            competition.id
          );
        }
        res.json(competitions);
      })
      .catch((err) => res.status(400).json({ status: "error", message: err }));
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
      .then(async(competitions) => {
        for (const competition of competitions) {
          competition.scores = await db.scores.read.filterByCompetitionId(
            competition.id
          );
        }
        res.json(competitions);
      })
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });
  competitions.put("/:competition_id", (req, res) => {});
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
      .then((competitions) => res.json(competitions))
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });

  return competitions;
};
