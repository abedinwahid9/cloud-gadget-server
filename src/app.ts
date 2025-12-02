import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes";
import path from "path";
import { cwd } from "process";
var cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cloudiegadget.netlify.app"],
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());

// route
app.use("/api/v1", router);

export default app;
