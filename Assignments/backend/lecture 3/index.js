//express framework
import express from "express";
//middleware
import bodyParser from "body-parser";
//for access html file
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let userInfo = {
  email: null,
  password: null,
};
//middleware
app.use(bodyParser.urlencoded({ extended: true }));

//costume middleware

function saveToDb(req, res, next) {
  //error
  if (req.body) {
    userInfo.email = req.body["email"];
    userInfo.password = req.body["password"];
  }
  next();
}

app.use(saveToDb);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/submit", (req, res) => {
  res.send(
    `<h1>Your email ${userInfo.email} and password ${userInfo.password}</h1>`
  );
});

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome</h1>");
// });

// app.post("/about", (req, res) => {
//   console.log(req.body);
// });

// app.post("/contact", (req, res) => {
//   res.sendStatus(201);
// });

// app.put("/login", (req, res) => {
//   res.sendStatus(204);
// });

// app.patch("/test", (req, res) => {
//   res.sendStatus(203);
// });

app.listen(port, () => {
  console.log("server");
});
