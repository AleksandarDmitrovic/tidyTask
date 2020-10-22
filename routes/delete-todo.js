const express = require('express');
const router = express.Router();

module.exports = (db) => {

  //Queries DELETE todo
  router.get("/:id", (req, res) => {
    const todoID = req.params.id;
    const userID = req.session.user_id;
    const queryParams = [todoID, userID];
    const queryString = `
    DELETE FROM todos
    WHERE id = $1
    AND user_id = $2
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
