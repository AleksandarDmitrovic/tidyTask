
const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    if (req.session.user_id) {
      res.redirect('/');
    } else {
      res.render("login");
    }
  });

  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });

  router.post("/", (req, res) => {
    res.redirect('/login/1');
  });

  return router;
};
