const judges = require("express").Router({ mergeParams: true });

module.exports = (db) => {
  judges.get("/", (req, res) => {
    const event_code = req.params.event_code;
    db.events.read.id
      .findByEventCode(event_code)
      .then((event_id) => db.judges.read.filterByEventId(event_id))
      .then((judges) => res.json(judges))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });
  return judges;
};
