//start with .env
//then db
//then userController
// then routes
//last server
import pg from "pg";
import dotenv from "dotenv";
//to use dotenv
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
