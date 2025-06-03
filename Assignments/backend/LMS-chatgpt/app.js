import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "./routes/authRoutes.js";
import coursesRoutes from "./routes/courseRoutes.js";
import enrollmentsRoutes from "./routes/enrollmentsRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import quizAnswerRoutes from "./routes/quizAnswerRoutes.js";
import quizSubmissionRoutes from "./routes/quizSubmissionRoutes.js";

//import for session and cookies
import session from "express-session";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/error.js";
const app = express();
app.use(helmet());
app.use(
  cors({
    //white listed for allowed domain
    origin: process.env.CORS_ORIGIN,
    //for the methods allowed
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    //to be more secure ->allowed header in req
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/auth", authRoute);
// api named health to return res JUST TO TRGER connection with server
app.get("/health", (req, res) => res.json({ status: "OK" }));

//error handlig middleware
app.use(notFound);
app.use(errorHandler);
//session and cookie middleware
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
      sameSite: "strict",
    },
  })
);

app.use("/api/courses", coursesRoutes);
app.use("/api/enrollments", enrollmentsRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quiz-answers", quizAnswerRoutes);
app.use("/api/quiz-submissions", quizSubmissionRoutes);

export default app;
