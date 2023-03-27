const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

const route = require("./routes");

const db = require("./config/db");
db.connect();

app.use(methodOverride("_method"));

app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resourses", "views"));

//routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
