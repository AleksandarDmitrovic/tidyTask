const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Queries selecting todos to edit
  // router.get("/:id", (req, res) => {
  //   let categoryID = req.params.id;

  // });








































  //Queries selecting todos to delete
  router.get("/:id", (req, res) => {
    let todoID = req.params.id;
    console.log('todoID :', todoID);
    const queryString = `
    DELETE FROM todos
    WHERE id = $1
    RETURNING *;`;
    queryParams = [todoID];

      db.query(queryString, queryParams)
        .then(data => {
          let categoryID = data.rows[0].category_id;
          console.log('categoryID :', categoryID);
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
