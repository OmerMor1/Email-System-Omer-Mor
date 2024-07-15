import { Register, Login, Logout } from "../Controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
