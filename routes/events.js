const express = require("express");
const router = express.Router();

module.exports = (db) => {
  /* GET users listing. */
  router.get("/", (req, res) => {
    db.events
      .all()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:event_code", (req, res) => {
    const event_code = req.params.event_code;
    db.events
      .getByCode(event_code)
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
