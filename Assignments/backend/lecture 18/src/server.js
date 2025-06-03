import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
//full extention
import router from "./routes/postsRoutes.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//add join make it run
app.use(express.static("public"));
//to call userRouters
app.use("/", router);

app.listen(process.env.PORT, () => {});
