import express from "express";
import { loginUser, registerUser } from "../controllers/accountController";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    if (req.query.signup === "true") await registerUser(req, res);
    else await loginUser(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
