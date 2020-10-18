const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT todos.title FROM todos WHERE todos.category_id = 1;`)
      .then(data => {
        const categories = data.rows;
        const arrTitle = [];
        categories.forEach(item => arrTitle.push(item.title));
        res.json(arrTitle);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
