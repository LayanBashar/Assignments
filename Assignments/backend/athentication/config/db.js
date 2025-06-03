import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
//connecnt to db
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //to more secure by encrypt  (secure socit layer)
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});

//just to check connection
pool.connect().then(() => {
  console.log("Database connected");
});

export const query = (text, params) => pool.query(text, params);
export default pool;
