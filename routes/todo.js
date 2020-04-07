const express = require("express");
const path = require("path");

const router = express.Router();

const todoController = require("../controller/todo");

router.get('/', todoController.getTodoPage);

router.post('/addTodo', todoController.addTodo);
router.post('/addDoing', todoController.addDoing);
router.post('/addDone', todoController.addDone);
router.post('/shiftTask', todoController.shiftTask);
router.post('/deleteTask', todoController.deleteTask);
module.exports = router;