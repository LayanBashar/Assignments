// import express from "express";
// import bodyParser from "body-parser";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

// app.post("/submit", (req, res) => {
//   const name = req.body.name;
//   res.send(`<h1> Hello, ${name} </h1>`);
// });
// app.listen(port, () => {});

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  const name = req.body.name;
  res.render("index.ejs", {
    name: name,
    cart: ["item1", "item2", "item2"],
    content: " contennnnttt",
  });
});
app.listen(port, () => {});
