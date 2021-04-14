const events = require("express").Router();
const competitions = require("./competitions");
const participants = require("./participants");
const judges = require("./judges");

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
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });

  events.use("/:event_code/competitions", competitions(db));
  events.use("/:event_code/participants", participants(db));
  events.use("/:event_code/judges", judges(db));

  return events;
};
