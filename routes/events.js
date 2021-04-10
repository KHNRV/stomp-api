const express = require('express');
const router = express.Router();

module.exports = (dbHelpers) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        dbHelpers.getEvents()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    return router;
};