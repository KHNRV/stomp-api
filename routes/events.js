const events = require("express").Router();
const competitions = require("./competitions");

module.exports = (db) => {
  /* GET users listing. */
  events.get("/", (req, res) => {
    db.events.read
      .all()
      .then((events) => res.json(events))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  events.get("/:event_code", (req, res) => {
    const event_code = req.params.event_code;
    db.events.read
      .findByEventCode(event_code)
      .then((event) => res.json(event))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  events.use("/:event_code/competitions", competitions(db));

  return events;
};
