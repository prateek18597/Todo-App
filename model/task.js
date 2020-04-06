const fs = require("fs");
const path = require("path");

const readTasks = (cb) =>{
    fs.readFile(path.join(__dirname,"..","data","tasks.json"),(err,data)=>{
        if(err)
            return cb([])
        else
            return cb(JSON.parse(data));
    });
}

let todoTasks = [];
let doingTasks = [];
let doneTasks = [];

module.exports = class Task {
    constructor(title,description){
        this.title = title;
        this.description = description;
    }

    addTodo(){
        this.time = new Date().toLocaleString()
        let tasks;
        readTasks((data)=>{
            tasks = data;
            if(tasks.todoTasks == undefined){
                tasks["todoTasks"] = [];
            }
            tasks.todoTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added in Todo");
            });
        })
    }

    addDoing(){
        this.time = new Date().toLocaleString()
        let tasks;
        readTasks((data)=>{
            tasks = data;
            if(tasks.doingTasks == undefined){
                tasks["doingTasks"] = [];
            }
            tasks.doingTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added in Doing");
            });
        })
    }

    addDone(){
        this.time = new Date().toLocaleString()
        let tasks;
        readTasks((data)=>{
            tasks = data;
            if(tasks.doneTasks == undefined){
                tasks["doneTasks"] = [];
            }
            tasks.doneTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added in Done");
            });
        })
    }

    static getTasks(cb){
        readTasks((data)=>{
            cb(data);
        });
    }
}