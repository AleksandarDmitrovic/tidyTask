const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Queries selecting todos by category
  router.get("/:id", (req, res) => {
    const categoryID = req.params.id;
    const cookieID = req.session.user_id;
    console.log('cookieID :', cookieID);

    if (categoryID === 'All') {
      db.query(`SELECT * FROM todos;`)
        .then(data => {
          const todos = data.rows;
          res.json(todos);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    } else if (categoryID === 'Uncategorized') {
      db.query(`SELECT * FROM todos WHERE category_id IS NULL;`)
        .then(data => {
          const todos = data.rows;
          res.json(todos);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      db.query(`SELECT * FROM todos WHERE todos.category_id = $1 ORDER BY todos.id;`, [categoryID])
        .then(data => {
          const todos = data.rows;
          res.json(todos);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    }

  });

  return router;
};
