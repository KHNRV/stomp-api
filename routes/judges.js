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
  judges.post("/", (req, res) => {
    const judge = req.body;
    const event_code = req.params.event_code;
    let event_id;

    db.events.read.id
      .findByEventCode(event_code)
      .then((id) => {
        event_id = id;
        return db.judges.create(event_id, judge);
      })
      .then(() => db.events.read.id.findByEventCode(event_code))
      .then((event_id) => db.judges.read.filterByEventId(event_id))
      .then((judges) => res.json(judges));
  });

  judges.put("/:judge_id", (req, res) => {
    const judge_update = req.body;
    const { judge_id, event_code } = req.params;
    let event_id;

    db.events.read.id
      .findByEventCode(event_code)
      .then((id) => {
        event_id = id;
        return db.judges.read.findById(judge_id);
      })
      .then((judge) => {
        if (judge.event_id === event_id) {
          return db.judges.update(judge_id, judge_update);
        } else {
          return res.status(400).json({
            status: "error",
            message: "You don't have authorization to perform that action",
          });
        }
      })
      .then(() => db.judges.read.filterByEventId(event_id))
      .then((judges) => res.json(judges))
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });
  judges.delete("/:judge_id", (req, res) => {
    const { judge_id, event_code } = req.params;
    let event_id;

    db.events.read.id
      .findByEventCode(event_code)
      .then((id) => {
        event_id = id;
        return db.judges.read.findById(judge_id);
      })
      .then((judge) => {
        if (judge.event_id === event_id) {
          return db.judges.delete(judge_id);
        } else {
          return res.status(401).json({
            status: "error",
            message: "You don't have authorization to perform that action",
          });
        }
      })
      .then(() => db.judges.read.filterByEventId(event_id))
      .then((judges) => res.json(judges))
      .catch((err) => res.status(400).json({ status: "error", message: err }));
  });

  return judges;
};
