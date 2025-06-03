import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let posts = [
  {
    id: 1,
    title: "Zerplon Maxed!",
    content: "Lorem ipsum dolor sit amet, quantum flux stabilized the node.",
    author: "Blix Gorban",
    date: "2025-04-20",
  },
  {
    id: 2,
    title: "Flumbostic Theory Fails Again",
    content: "Velit dolore ex starmetric polynomial fudged the numbers.",
    author: "Trixi Lumbo",
    date: "2025-04-21",
  },
  {
    id: 3,
    title: "Garblox Event Crashed My Server",
    content: "Reprehenderit tempor qui glitchified the whole system.",
    author: "Dr. Wizzle",
    date: "2025-04-22",
  },
];
//length of posts array
let lastId = 3;
//to show all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});
//to show specific post and check if it is exist
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post Not Found" });
  }
});

//create new post
app.post("/posts", (req, res) => {
  lastId++;
  const newPost = {
    id: lastId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  posts.push(newPost);
  //for testing only
  res.status(201).json(newPost);
});

//update post
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);
  const postObj = posts[postIndex];
  const updatedPost = {
    id: id,
    title: req.body.title || postObj.title,
    content: req.body.content || postObj.content,
    author: req.body.author || postObj.author,
    date: postObj.date,
  };

  posts[postIndex] = updatedPost;
  res.status(200).json(updatedPost);
});

//update
app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);
  const postObj = posts[postIndex];
  if (postIndex > -1) {
    const updatedPost = {
      id: id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date(),
    };

    posts[postIndex] = updatedPost;
    res.status(200).json(updatedPost);
  } else res.status(404).json({ error: "Not Found" });
});
//delete one specific post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    res.sendStatus(200);
  } else res.status(404).json({ error: "Not Found" });
});

app.delete("/posts", (req, res) => {
  posts = [];
  res.json(posts);
});

app.listen(port, () => {
  console.log("API :local host : 4000");
});
