const competitions = require("express").Router({ mergeParams: true });

module.exports = (db) => {
  competitions.get("/", (req, res) => {
    console.log(req.params.event_code);
    const event_code = req.params.event_code;
    db.competitions.read
      .filterByEventCode(event_code)
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
