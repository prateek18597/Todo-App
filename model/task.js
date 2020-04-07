const fs = require("fs");
const path = require("path");

const readTasks = (cb) =>{
    fs.readFile(path.join(__dirname,"..","data","tasks.json"),(err,data)=>{
        if(err){
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),
            JSON.stringify({"todoTasks":[],"doingTasks":[],"doneTasks":[]}),
            () => {
                console.log("tasks.json created.")
                cb({
                    "todoTasks":[],
                    "doingTasks":[],
                    "doneTasks":[]
                },0);    
            }
            );
        } else{
            let length = 0;
            data = JSON.parse(data);
            length += data.todoTasks.length + data.doingTasks.length + data.doneTasks.length;
            return cb(data,length);
        }
    });
}

const findTask = (id,data,cb) => {
    let i = 0;
    for (let task of data) {
        if(task.id == id){
            let temp = {"task":task,"position":i}; 
            cb(temp);
        }
        i+=1;
    }
    cb(null);
}

module.exports = class Task {
    constructor(title,description){
        this.title = title;
        this.description = description;
    }

    addTodo(){
        this.time = new Date().toLocaleString()
        let tasks;
        readTasks((data,length)=>{
            tasks = data;
            if(tasks.todoTasks == undefined){
                tasks["todoTasks"] = [];
            }
            this.id = length+1;
            tasks.todoTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added in Todo");
            });
        })
    }

    addDoing(){
        this.time = new Date().toLocaleString()
        let tasks;
        readTasks((data,length)=>{
            tasks = data;
            if(tasks.doingTasks == undefined){
                tasks["doingTasks"] = [];
            }
            this.id = length+1;
            tasks.doingTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added in Doing");
            });
        })
    }

    addDone(){
        this.time = new Date().toLocaleString()
        let tasks;
        readTasks((data, length)=>{
            tasks = data;
            if(tasks.doneTasks == undefined){
                tasks["doneTasks"] = [];
            }
            this.id = length+1;
            tasks.doneTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added in Done");
            });
        })
    }

    doingtoTodo(){
        let tasks;
        readTasks((data, length)=>{
            tasks = data;
            tasks.todoTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added to Todo");
            });
        })
    }

    todotoDoing(){
        let tasks;
        readTasks((data, length)=>{
            tasks = data;
            tasks.doingTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added to Doing");
            });
        })
    }

    doingtoDone(){
        let tasks;
        readTasks((data, length)=>{
            tasks = data;
            tasks.doneTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added to Done");
            });
        })
    }

    doneToDoing(){
        let tasks;
        readTasks((data, length)=>{
            tasks = data;
            tasks.doneTasks.push(this);
            fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                console.log(this," Added to Done");
            });
        })
    }

    static shift(id,from,to,cb){
        let tasks;
        readTasks(async (data, length)=>{
            tasks = data;
            findTask(id,tasks[from],(d)=>{
                tasks[from].splice(d.position,1);
                tasks[to].push(d.task);
                fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                    cb();
                });
            });
        })
    }

    static deleteTask(id, list, cb){
        let tasks;
        readTasks(async (data, length)=>{
            tasks = data;
            findTask(id,tasks[list],(d)=>{
                tasks[list].splice(d.position,1);
                fs.writeFile(path.join(__dirname,"..","data","tasks.json"),JSON.stringify(tasks),()=>{
                    cb();
                });
            });
        })
    }

    static getTasks(cb){
        readTasks((data,length)=>{
            cb(data);
        });
    }
}