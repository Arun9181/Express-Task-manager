let mongoose=require("mongoose")


let TaskSchema=new mongoose.Schema({
    task:{
        type:String,
        require:true,
        trim:true
    }
},{timestamps:true})


module.exports=mongoose.model("task",TaskSchema)