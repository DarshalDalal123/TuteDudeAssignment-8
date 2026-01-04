const express = require("express");
const router = express.Router();
const { createTodo, getAllTodos, getTodoById, getTodosByCategory, searchTodoByTitle, deleteTodoById, updateTodoById } = require("../controllers/todoController");

router.post("/todos", createTodo);
router.get("/todos", getAllTodos);
router.get("/todos/category", getTodosByCategory);
router.get("/todos/search", searchTodoByTitle);
router.get("/todos/:id", getTodoById);
router.put("/todos/:id", updateTodoById);
router.delete("/todos/:id", deleteTodoById);

module.exports = router;