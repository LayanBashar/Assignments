import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //to secure our req
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});
//just to check connection with db
pool.connect().then(() => {
  console.log("Database connected");
});

// function query (text,params){
// return pool.query(text, params) }
//same as the function just shorter
//callback function
export const query = (text, params) => pool.query(text, params);
export default pool;
