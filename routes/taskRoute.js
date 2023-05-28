const express=require("express")
let taskRouter=express.Router()
const { postTask, getTask, getTasks, updateTask, deleteTask } = require("../controller/taskController")

//ROUTE to create task
taskRouter.get("/task",getTasks)


// ROUTE to post task
taskRouter.post("/task",postTask)
//get one task to update
taskRouter.get("/task/:id",getTask)
//update one task 
taskRouter.put("/task/:id",updateTask)

taskRouter.delete("/task/:id",deleteTask)
module.exports=taskRouter;

//http://localhost:5000/task-manager-task