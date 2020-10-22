const express = require('express');
const router  = express.Router();

module.exports = () => {

  //Delete- Logout and Cookie Clearing
  router.delete("/", (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
  });

  return router;
};
