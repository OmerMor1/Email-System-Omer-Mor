import express from "express";
import {
  createEmail,
  getEmails,
  getEmail,
} from "../Controllers/email.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/email", verifyToken, createEmail);
router.get("/emails", verifyToken, getEmails);
router.get("/emails/:id", verifyToken, getEmail);

export default router;
