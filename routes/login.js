
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });
  return router;
};
