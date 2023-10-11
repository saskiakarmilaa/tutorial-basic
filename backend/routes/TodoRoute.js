import express from "express";
import {
  getTodo,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/TodoController.js";

const router = express.Router();
router.get("/todo", getTodo);
router.get("/todo/:id", getTodoById);
router.post("/todo", createTodo);
router.patch("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);
export default router;