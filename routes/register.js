const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");


module.exports = (db) => {
  const userEmailSearch = async (email) => {


    const results = await db.query(`
    SELECT email FROM users
    WHERE email = $1;
    `, [email])
      .then(res => {
        return res.rows
      });

    return results;
  }
  // router.get("/", (req, res) => {
  //   if (req.session.user_id) {
  //     res.redirect('/');
  //   } else {
  //     res.render("login");
  //   }
  // });


  //Add- Registration Handler for New User Creation
  router.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log('req.body :', req.body);
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (email === '' || password === '') {
      return res.status(404).send("Invalid email or password");
    }

    userEmailSearch(email).then(emailFound => {
    console.log('emailFound :', emailFound);
      console.log('emailFound.length === 0 :', emailFound.length === 0);

      if (emailFound.length !== 0) {
        return res.status(404).send("User Email Already Exists");
      }
    });



    // const newUser = {
    //   id,
    //   email,
    //   password: hashedPassword
    // };
    // users[id] = newUser;

    // req.session.user_id = id;
    // res.redirect('/urls/');
  });

  return router;
};
