import express from "express";
import bodyParser from "body-parser";
import { title } from "process";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [post];
const post = {
  title: "",
  content: "",
  author: "",
  date: new Date(),
};
app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts: posts,
  });
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", {
    title: title,
    content: content,
    author: author,
  });
});

app.put("/submit", (req, res) => {
  res.render("index.ejs", {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });
});

const delePost = {""};
app.delete("/submit", (req, res) => {
  res.render("index.ejs", {delePost:delePost}

  );
});

app.listen(port, () => {});
console.log("working..");
