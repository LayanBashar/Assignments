//to use pool from db
import pool from "../config/db.js";

//Create
export const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    await pool.query(
      "INSERT INTO posts(title,content,author) VALUES($1,$2,$3)RETURNING *",
      [title, content, author]
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Read
export const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id");
    res.render("index.ejs", { posts: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updatePosts = async (req, res) => {
  const { title, content, author } = req.body;
  const id = req.params.id;
  try {
    await pool.query(
      "UPDATE posts SET title=$1 , content=$2 ,author=$3 WHERE id=$4 RETURNING *",
      [title, content, author, id]
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete
export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
