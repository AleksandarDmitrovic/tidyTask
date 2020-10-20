const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //Queries DELETE todo
  router.get("/:id", (req, res) => {
    const todoID = req.params.id;
    const queryParams = [todoID];
    const queryString = `
    DELETE FROM todos
    WHERE id = $1
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
