import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const array1 = ["fname1", "fname", "fname3"];
  const array2 = ["lname1", "lname", "lname3"];
  let randomname1 = array1[Math.floor(Math.random() * array1.length)];
  let randomname2 = array2[Math.floor(Math.random() * array2.length)];

  res.render("index.ejs", {
    randomname1: randomname1,
    randomname2: randomname2,
  });
});
app.listen(port, () => {});
console.log("working..");
