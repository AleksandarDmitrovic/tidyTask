const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = (db) => {
  const userEmailSearch = async (email) => {


    const results = await db.query(`
    SELECT email FROM users
    WHERE email = $1;
    `, [email])
      .then(res => {
        return res.rows
      });

    return results;
  }



  //Add- Registration Handler for New User Creation
  router.post('/', (req, res) => {
    let id;
    const { email, password, name } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (email === '' || password === '' || name === '') {
      return res.status(404).send("Empty name, email or password field");
    }

    userEmailSearch(email).then(emailFound => {
      if (emailFound.length !== 0) {
        return res.status(404).send("User Email Already Exists");
      }
    });
    const queryParams = [name, email, hashedPassword];
    const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`;

    db.query(queryString, queryParams)
      .then((data) => {
        id = data.rows[0].id;
        req.session.user_id = id;
        res.redirect('/');
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  return router;
};
