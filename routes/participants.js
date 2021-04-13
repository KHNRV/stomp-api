const participants = require("express").Router({ mergeParams: true });

module.exports = (db) => {
  participants.get("/", (req, res) => {
    const event_code = req.params.event_code;
    db.events.read.id
      .findByEventCode(event_code)
      .then((event_id) => db.participants.read.filterByEventId(event_id))
      .then((participants) => res.json(participants))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });
  return participants;
};
