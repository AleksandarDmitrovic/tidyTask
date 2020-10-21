const express = require('express');
const router = express.Router();
const { checkDandelionAPI } = require('../public/scripts/dandelion_api');

module.exports = (db) => {

  //Create a new todo instance
  router.get("/", (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    const userID  = 1;
    checkDandelionAPI(title)
      .then(category_id => {
        console.log('category_id :', category_id);
        const queryParams = [title, description, userID, category_id];
        const queryString = `
        INSERT INTO todos (title, description, user_id, category_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;

        db.query(queryString, queryParams)
          .then((data) => {
            const categoryID = data.rows[0].category_id;
            res.json(categoryID);
          });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};
