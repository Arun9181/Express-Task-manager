const express=require("express")
const mongoose=require("mongoose")
const taskRouter=require("./routes/taskRoute")
const methodOverride=require("method-override")
const {engine}=require("express-handlebars")
let app=express()
// let PORT=5000

let db=async ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/Task-Manager")
    console.log("MongoDB Connected");
}
db()

//inbuilt middleware
app.use(express.static("public"))

//to use the form data
app.use(express.urlencoded({extended:false}))

//methodOverride is used to override post method
app.use(methodOverride("_method"))

//mount template engine
app.engine("handlebars",engine())
app.set("view engine","handlebars")

//ROUTER LEVEL MIDDLEWARE

app.use("/task-manager",taskRouter)
//http://localhost:5000/task-manager/task    endpoint will look like this

// app.listen(PORT,(err)=>{
//     if(err) throw err
//     console.log(`Server is running on ${PORT}`);
// })

if(process.env.NODE_ENV!=="production"){
    require("dotenv").config()
}

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(process.env.PORT,(err)=>{
    if(err) console.log(err);
    console.log(`Server is running on ${process.env.PORT}`);
})