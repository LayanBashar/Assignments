import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./Routes/authRoutes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import "./config/db.js"; // Import database connection

const app = express();
//to use it for secure header
app.use(helmet());
//to use it to connect frontend with backend
app.use(
  cors({
    origin: process.env.CORSE_ORIGIN,
    //allow methods to call it
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    //for more secure
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//to make logs for the req
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

//middleware  from express 'bodyparser'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", authRoutes);

//error handling middleware
app.use(notFound);
app.use(errorHandler);

// Session and Cookie
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict",
    },
  })
);

export default app;
