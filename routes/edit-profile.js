const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const e = require('express');

module.exports = (db) => {

  router.get("/", (req, res) => {
    const  userId  = req.session.user_id;
    const { name, email, password } = req.query;
    const hashedPassword = bcrypt.hashSync(password, 10);
    let queryString = ``;
    const queryParams = [];

    if (name === '') {
      queryParams.push(userId);
      queryParams.push(email);
      queryParams.push(hashedPassword);
      queryString += `
      UPDATE users
      SET email = $2,
      password = $3
      WHERE id = $1`;
    } else if (email === '') {
      queryParams.push(userId);
      queryParams.push(name);
      queryParams.push(hashedPassword);
      queryString += `
      UPDATE users
      SET name = $2,
      password = $3
      WHERE id = $1`;
    } else if (password === '') {
      queryParams.push(userId);
      queryParams.push(name);
      queryParams.push(email);
      queryString = `
      UPDATE users
      SET name = $2,
      email = $3,
      WHERE id = $1`;
    } else {
      queryParams.push(userId);
      queryParams.push(name);
      queryParams.push(email);
      queryParams.push(hashedPassword);
      queryString += `
      UPDATE users
      SET name = $2,
      email = $3,
      password = $4
      WHERE id = $1`;
    }

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
