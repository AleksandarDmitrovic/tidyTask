const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Queries selecting todos to edit
  router.get("/:id", (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    const complete = req.query.complete;
    const id = req.query.id;
    const queryParams = [title, description, complete, id];
    console.log(queryParams);

    const queryString = `
    UPDATE todos
    SET title = $1,
    description = $2,
    complete = $3
    WHERE todos.id = $4`;

    db.query(queryString, queryParams)
      .then(() => {
        console.log(id);
        if (id !== null) {
          db.query(`SELECT * FROM todos WHERE todos.category_id = $1 ORDER BY todos.id;`, [id])
            .then(data => {
              const todos = data.rows;
              res.json(todos);
            });
        } else {
          db.query(`SELECT * FROM todos WHERE todos.category_id IS NULL;`)
            .then(data => {
              console.log('data: ', data);
              console.log('id: ', id);
              const todos = data.rows;
              res.json(todos);
            });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  //Queries selecting todos to delete

  return router;
};
