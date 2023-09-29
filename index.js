// first step after creating index.js is to install npm for this use terminal and run command npm init
// Second step is in package.json
// second step is to add this start function in this scripts section and use "nodemon index.js",
// third step is to create the below two lines http and port
// const http=require('http');
const port= 1500;
const express= require('express');
const path=require('path');
const app=express();
const db=require('./config/mongoose');
const Task=require('./models/task');
app.use(express.urlencoded());
app.use(express.static('assets'));
var taskPending=[]
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// const fs=require('fs');

app.get('/',async function(req,res){
    try{
       const task=await Task.find({});
       const pendingCount = task.filter(task => !task.checkbox).length;
       const completedCount = task.filter(task => task.checkbox).length;
        return res.render('index', {
            title: "TODO TASK APP",
            task_list:task,
            pendingCount,
            completedCount
        });
    }catch(err){
        console.log(`Error in fetching contact from db ${err}`);
        return
    }
});
app.post('/create-task',async function(req,res){
    // taskPending.push({
    //     taskName:req.body.taskName,
    //     category:req.body.category,
    //     date: req.body.date,
    //     checkbox:false
    // })
    try{
        const newTask=await Task.create({
            taskName:req.body.taskName,
            category:req.body.category,
            date:req.body.date,
            checkbox:false
        });
        console.log('Task Created',newTask);
        return res.redirect('/');
    }catch(err){
                console.log(`error in creating a task: ${err}`)
                return;
            }
});
app.get('/usermanual',function(req,res){
    return res.render('usermanual',{title:"How-to-Use"});
});
app.get('/edit-task', async function (req, res) {
    const taskName = req.query.taskName;
    try {
        const task = await Task.findOne({ taskName });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Toggle the checkbox value
        task.checkbox = !task.checkbox;
        await task.save();

        return res.status(200).json({ message: 'Task updated successfully' });
    } catch (err) {
        console.error(`Error updating task: ${err}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post('/delete-tasks', async function (req, res) {
    try {
        // Delete tasks where checkbox is true
        await Task.deleteMany({ checkbox: true });

        return res.redirect('/');
    } catch (err) {
        console.error(`Error deleting tasks: ${err}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server on port number ${port}`)
    }console.log(`Server is running on port ${port}`)
});



// 5th step is to create the below function
// function requestHandler(req,res){
//     console.log(req.url);
//     res.writeHead(200,{'content-type':'text/html'});
//     // fs.readFile('./index.html',function(err,data){
//     //     if (err){
//     //         console.log(`Error occured while completing your request: ${err}`);
//     //         return res.end(404);
//     //     } return res.end(data);
//     // });
//     let filepath;
//     switch(req.url){
//         case '/':
//             filepath='./index.html'
//             break;
//         default:
//             filepath='./404.html'
//             break;
//     };
//     fs.readFile(filepath,function(err,data){
//         if (err){
//             console.log(`Error occured while loading the page: ${err}`);
//             return res.end(`<h1>Error</h1>`);
//         }return res.end(data);
//     });
// };
// // 4th step is to create a server with create server function of http and store it in const server and create a sever.listen function to connect with the port
// const server=http.createServer(requestHandler);//added the function requestHandler after creating it before this the brackets were empty
// server.listen(port,function(err){
//     if (err){
//         console.log("Error in running the server");
//         return;
//     }console.log(`Server is running on: ${port}`);
// });