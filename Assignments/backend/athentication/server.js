//to use env
import dotenv from "dotenv";
dotenv.config();

//to use app.js
import app from "./app.js";
//to handle port
const PORT = process.env.PORT || "5000";
//to handle env
const ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {});
console.log(`Server running in ${ENV} on port ${PORT}`);
