import express from "express";
import { authUser, login, register } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Router is live");
});

router.post("/register", register);
router.post("/login", login);
router.post("/auth", authUser);

export default router;
