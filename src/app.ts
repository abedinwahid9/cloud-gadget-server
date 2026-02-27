import express from "express";
import helmet from "helmet";
import router from "./routes/routes";
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
app.use(helmet());
app.use(express.static("public"));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://cloudiegadget.netlify.app"],
    credentials: true, // ← essential
  })
);

// route
app.use("/api/v1", router);

export default app;
