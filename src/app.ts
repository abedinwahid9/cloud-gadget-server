import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// route
app.use("/v1", router);

export default app;
