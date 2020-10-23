
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const userInfoSearch = async (email) => {

    const results = await db.query(`
    SELECT email, password, id FROM users
    WHERE email = $1;
    `, [email])
      .then(res => {
        return res.rows[0];
      });

    return results;
  }

  router.get("/", (req, res) => {
    if (req.session.user_id) {
      res.redirect('/');
    } else {
      res.render("login");
    }
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body;
    console.log('req.body :', req.body);

    if (email === '' || password === '') {
      return res.status(404).send("Empty email or password field");
    }

    userInfoSearch(email).then(userInfo => {
      console.log('userInfo :', userInfo);

      if (userInfo === undefined) {
        return res.status(404).send("Incorrect Email or Password");
      }

      if (!bcrypt.compareSync(password, userInfo.password)) {
        return res.status(404).send("Incorrect Email or Password");
      }

      req.session.user_id = userInfo.id;
      res.redirect('/');
    });

  });

  return router;
};
