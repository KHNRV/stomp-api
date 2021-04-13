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
        return db.participants.create(event_id, participant);
      })
      .then(() => db.events.read.id.findByEventCode(event_code))
      .then((event_id) => db.participants.read.filterByEventId(event_id))
      .then((participants) => res.json(participants));
  });

  participants.put("/:participant_id", (req, res) => {
    const participant_update = req.body;
    const { participant_id, event_code } = req.params;
    let event_id;

    db.events.read.id
      .findByEventCode(event_code)
      .then((id) => {
        event_id = id;
        return db.participants.read.findById(participant_id);
      })
      .then((participant) => {
        if (participant.event_id === event_id) {
          return db.participants.update(participant_id, participant_update);
        } else {
          return res.status(400).json({
            status: "error",
            message: "You don't have authorization to perform that action",
          });
        }
      })
      .then(() => db.participants.read.filterByEventId(event_id))
      .then((participants) => res.json(participants))
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });
  participants.delete("/:participant_id", (req, res) => {
    const { participant_id, event_code } = req.params;
    let event_id;

    db.events.read.id
      .findByEventCode(event_code)
      .then((id) => {
        event_id = id;
        return db.participants.read.findById(participant_id);
      })
      .then((participant) => {
        if (participant.event_id === event_id) {
          return db.participants.delete(participant_id);
        } else {
          return res.status(401).json({
            status: "error",
            message: "You don't have authorization to perform that action",
          });
        }
      })
      .then(() => db.participants.read.filterByEventId(event_id))
      .then((participants) => res.json(participants))
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });

  return participants;
};
