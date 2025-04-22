import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

const password = "123123";

let isAuth = false;

function lock(req, res, next) {
  if (req.body && req.body.password === password) {
    isAuth = true;
  }
  next();
}
app.use(lock);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/secrets", (req, res) => {
  if (isAuth) {
    res.sendFile(__dirname + "/public/secrets.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log("server");
});
