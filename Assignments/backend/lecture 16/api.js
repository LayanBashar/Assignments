import express from "express";
import bodyParser from "body-parser";
//forst step
import pg from "pg";
const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//second step
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "123",
  port: 5432,
});
//to only check if it is connected successfully (promise)
db.connect()
  .then(() => {
    console.log("connected successfully");
  })
  .catch(() => {});

//to show all posts
//using db
app.get("/posts", async (req, res) => {
  //promise method using async await
  //try catch to handle an error
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//to show specific post and check if it is exist
app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length > 0) res.json(result.rows[0]);
    else res.status(404).json({ error: "Post Not Found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create new post
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO posts(title,content,author) VALUES($1,$2,$3)RETURNING *",
      [title, content, author]
    );
    res.send(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  res.status(201).json(newPost);
});

//update post
app.patch("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  try {
    const fields = [];
    const values = [];
    let count = 1;
    if (title) {
      fields.push(`title=$${count++}`);
      values.push(title);
    }

    if (content) {
      fields.push(`content=$${count++}`);
      values.push(content);
    }

    if (author) {
      fields.push(`author=$${count++}`);
      values.push(author);
    }
    values.push(id);

    const result = await db.query(
      `UPDATE posts SET ${fields.join(
        ", "
      )}, date=NOW() WHERE id=$${count} RETURNING *`,
      values
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else res.status(404).json({ error: `Post id ${id} not found` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update
// in db : UPDATE posts
// 	SET title=?, content=?, author=?, date=?
// 	WHERE id=1;
app.put("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  try {
    const result = await db.query(
      "UPDATE posts SET title=$1, content=$2, author=$3, date=NOW() WHERE id=$4 RETURNING *",
      [title, content, author, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else res.status(404).json({ error: `Post id ${id} not found` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//delete one specific post
app.delete("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM posts WHERE id= $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.sendStatus(200);
    } else {
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("API :local host : 4000");
});
