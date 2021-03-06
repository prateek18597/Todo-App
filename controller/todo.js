const path = require('path');

const Task = require("../model/task");

exports.getTodoPage = (req,res,next) => {
    let tasks;
    Task.getTasks((data)=>{
        tasks = data;
        res.render(path.join(__dirname,"..","views","todo"),
        {
            "todoTasks" :   tasks.todoTasks,
            "doingTasks":   tasks.doingTasks,
            "doneTasks" :   tasks.doneTasks
        });
    });
}

exports.addTodo = (req,res,next) => {
    const todoTask = new Task(req.body.title,req.body.description);
    todoTask.addTodo();
    res.redirect("/");
}

exports.addDoing = (req,res,next) => {
    const doingTask = new Task(req.body.title,req.body.description);
    doingTask.addDoing();
    res.redirect("/");
}

exports.addDone = (req,res,next) => {
    const doneTask = new Task(req.body.title,req.body.description);
    doneTask.addDone();
    res.redirect("/");
}

exports.shiftTask = (req,res,next) => {
    Task.shift(req.body.id,req.body.from,req.body.to,()=>{
        console.log("Shift Complete.");
    });
    res.redirect("/");
}

exports.deleteTask = (req,res,next) => {
    Task.deleteTask(req.body.id,req.body.list,()=>{
        console.log("Delete Complete.");
    });
    res.redirect("/");
}