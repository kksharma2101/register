import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import connectToDb from "../config/db.config.js";
import cookie from "cookie-parser";
import router from "../routers/user.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(morgan("start"));
app.use(cors());

app.use("/api", router);

await connectToDb();

export default app;
