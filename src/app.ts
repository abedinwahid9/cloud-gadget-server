import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes";
import path from "path";
import { cwd } from "process";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.static("public"));

// route
app.use("/api/v1", router);

export default app;
