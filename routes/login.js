
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.user_id) {
      res.redirect('/');
    } else {
      res.render("login");
    }
  });

  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    console.log('req.params :', req.params);
    res.redirect('/');
  });

  router.post("/login", (req, res) => {
    res.redirect('/1');
  });

  return router;
};
