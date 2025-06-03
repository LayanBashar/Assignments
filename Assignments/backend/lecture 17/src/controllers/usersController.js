//for query db
import pool from "../config/db";

//Create
export const createUsers = async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query("INSERT INTO users (name,email) VALUES($1,$2)", [
      name,
      email,
    ]);
  } catch (error) {}
};

//Read
export const getUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.render("index.ejs", { users: result.rows });
};

//Update
// export const updateUsers = async (req, res) => {
//   const { name, email } = req.body;
//   const id=req.params.id
//    try {
//       await pool.query("UPDATE users SET name=$1,email=$2 where id=$3 ", [
//     name,
//     email,
//     id
//   ]);
//   } catch (error) {

//   }
// };

//Delete
// export const deleteUser = async (req, res) => {
//   const id=req.params.id
//    try {
//        await pool.query("DELETE FROM users WHERE id ", [
//     name,
//     email,
//     id
//   } catch (error) {

//   }
// };
