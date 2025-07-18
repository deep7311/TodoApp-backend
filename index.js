import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.route.js"
import todoRouter from "./routes/todo.route.js"
import dotenv from "dotenv";
dotenv.config()

const app = express();

const dbuser = encodeURIComponent(process.env.DB_USER);
const dbpass = encodeURIComponent(process.env.DB_PASS);

mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.iitm5oq.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  console.log("Connected to MongoDB");
  app.listen(8080, () => {
    console.log("Server started at Port 8080");
  });
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello main page");
});

app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);