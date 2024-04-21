import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { dbConnect } from "./src/db/dbConnect.js";
import LoginRoute from "./src/routes/auth/Login.route.js"
import SignUpRoute from './src/routes/auth/signup.route.js';
import GetTasksRoute from './src/routes/task/getTask.route.js';
import AddTaskRoute from './src/routes/task/addTask.route.js'
import MarkCompleteRoute from './src/routes/task/markComplete.route.js'


const app=express();

dbConnect();

app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin:true, credentials: true }));

app.use('/signup',SignUpRoute);
app.use('/login',LoginRoute);
app.use('/get',GetTasksRoute);
app.use('/taskly',AddTaskRoute);
app.use('/mark',MarkCompleteRoute);

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen(8000,()=>{
    console.log('App listening on port 8000')
})