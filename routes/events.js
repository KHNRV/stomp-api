const express = require("express");
const router = express.Router();

module.exports = (db) => {
  /* GET users listing. */
  router.get("/", (req, res) => {
    db.getEvents()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
