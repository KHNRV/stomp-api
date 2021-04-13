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

  participants.post("/", (req, res) => {
    const participant = req.body;
    const event_code = req.params.event_code;
    let event_id;

    db.events.read.id
      .findByEventCode(event_code)
      .then((id) => {
        event_id = id;
        return db.participants.create(id, participant);
      })
      .then(() => db.events.read.id.findByEventCode(event_code))
      .then((event_id) => db.participants.read.filterByEventId(event_id))
      .then((participant) => res.json(participant));
  });

  return participants;
};
