import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes";
var cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cloudiegadget.netlify.app"],
    credentials: true, // ← essential
  })
);

app.use(express.static("public"));

// route
app.use("/api/v1", router);

export default app;
