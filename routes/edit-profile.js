const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  router.get("/", (req, res) => {
    const  userId  = req.session.user_id;
    const { name, email, password } = req.query;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const queryParams = [userId, name, email, hashedPassword];

    const queryString = `
    UPDATE users
    SET name = $2,
    email = $3,
    password = $4
    WHERE id = $1`;

    db.query(queryString, queryParams)
      .then((data) => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};
