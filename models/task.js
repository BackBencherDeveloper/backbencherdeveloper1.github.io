const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    checkbox:{
        type:Boolean,
        required:true
    }
});
const Task=mongoose.model('taskPending',taskSchema)
module.exports=Task;
mongoose.connect('mongodb://localhost/todo_app_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});