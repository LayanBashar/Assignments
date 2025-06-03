import pg from "pg";
import dotenv from "dotenv";
//to use dotenv
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//اصدر من الكود تبعي
export default pool;
