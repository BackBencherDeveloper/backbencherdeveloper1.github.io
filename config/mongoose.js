const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/todo_app_db');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to db"));
db.once('open',function(){
    console.log('Server is succesfully connected to the db');
});
