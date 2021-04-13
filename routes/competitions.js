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
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });
  return competitions;
};
