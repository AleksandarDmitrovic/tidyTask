const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Queries UPDATE todo
  router.get("/:id", (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    const complete = req.query.complete;
    const id = req.query.id;
    const queryParams = [title, description, complete, id];
    const categoryID = req.query.categoryID;

    const queryString = `
    UPDATE todos
    SET title = $1,
    description = $2,
    complete = $3
    WHERE todos.id = $4
    RETURNING *;`;

    db.query(queryString, queryParams)
      .then((data) => {
        const categoryID = data.rows[0].category_id;
        res.json(categoryID);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
