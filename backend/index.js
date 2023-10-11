import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import TodoRoute from "./routes/TodoRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(TodoRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
} );

