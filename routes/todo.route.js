// get -> /api/todos/:id
// post -> /api/todos
// patch -> /api/todos/:id
// delete -> /api/todos/:id


import express from 'express';
import { addTodo, deleteTodo, getToddo, updateTodoStatus } from '../controllers/todos.controller.js';

const router = express.Router()

router.get("/:id", getToddo)
router.post("/:id", addTodo)
router.patch("/:id", updateTodoStatus)
router.delete("/:id", deleteTodo)

export default router;