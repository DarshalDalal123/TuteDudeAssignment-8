const express = require("express");
const router = express.Router();
const { createTodo, getAllTodos, getTodoById, deleteTodoById, updateTodoById } = require("../controllers/todoController");

router.post("/todos", createTodo);
router.get("/todos", getAllTodos);
router.get("/todos/:id", getTodoById);
router.put("/todos/:id", updateTodoById);
router.delete("/todos/:id", deleteTodoById);

module.exports = router;