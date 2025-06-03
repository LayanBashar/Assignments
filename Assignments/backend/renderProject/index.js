import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];
let currentId = 1;
app.get("/", (req, res) => {
  res.render("home", { posts: posts });
});

app.get("/newPost", (req, res) => {
  res.render("new");
});

app.post("/create", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  posts.push({ id: currentId++, title, content });
  res.redirect("/");
});
app.get("/deletePost/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/");
});

app.get("/editPost/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.send("Post Not Found");
  }
  res.render("edit", { post: post });
});

app.post("/editPost/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.send("Post Not Found");
  }
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

app.listen(port, () => {});
console.log("working..");
