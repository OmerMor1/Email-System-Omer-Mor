import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./dbConnection.js";
import authRouter from "./Routes/auth.route.js";
import emailRouter from "./Routes/email.route.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/", emailRouter);
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
