// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// Middleware
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['super-long-secret-keys', 'typically-not-embedded-in-code']
}));
app.use(methodOverride('_method'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const categoryRoutes = require("./routes/categories");
const deleteTodoRoutes = require("./routes/delete-todo");
const editProfileRoutes = require("./routes/edit-profile");
const editTodoRoutes = require("./routes/edit-todo");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const newTodoRoutes = require("./routes/new-todo");
const registerRoutes = require("./routes/register");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/categories", categoryRoutes(db));
app.use("/deleteTodo", deleteTodoRoutes(db));
app.use("/editprofile", editProfileRoutes(db));
app.use("/editTodo", editTodoRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/newTodo", newTodoRoutes(db));
app.use("/register", registerRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  const userInfoSearch = async(id) => {

    const results = await db.query(`
    SELECT name FROM users
    WHERE id = $1;
    `, [id])
      .then(res => {
        return res.rows[0];
      });

    return results;
  };

  const cookieID = req.session.user_id;
  userInfoSearch(cookieID).then(userName => {

    const templateVars = { userName };
    if (req.session.user_id) {
      res.render("index", templateVars);
    } else {
      res.redirect('/login');
    }
  });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


