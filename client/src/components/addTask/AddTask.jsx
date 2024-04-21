import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import myContext from '../../context/myContext.js';

function AddTask({fetchData}) {
  
  const {addTask,setAddTask}=useContext(myContext)

  const handleTaskChange=(e)=>{
    const{name,value}=e.target;
    setAddTask({...addTask,[name]:value});
  };

  const AddTask=async(addTask)=>{
   try {
    const response= await axios.post('http://localhost:8000/taskly/new-task',addTask,{withCredentials:true});
    if(response.status===201){
      fetchData();
      setAddTask({
        title:'',
        description:'',
        dueDate:''
      });
      toast.success(response.data.msg,{
        autoClose:1000,
        hideProgressBar:true
      })
      return;
    }
  
   } catch (error) {
    if(error.response && error.response.status===500){
      toast.error(error.response.data.msg,{
        autoClose:1000,
        hideProgressBar:true
      })
    };
   }
  }

  const handleAddTask=(e)=>{
    e.preventDefault();
    // console.log(typeof(task.dueDate))

    const {title,description,dueDate}=addTask;
    
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if(!trimmedTitle || !trimmedDescription || !dueDate ){
      toast.error("All fields are required",{
        autoClose:1000,
        hideProgressBar:true
      })
      return;
    }

    const todayDate=new Date();
    let dueDateCheck=new Date(dueDate);
    dueDateCheck.setHours(23, 59, 59, 999);

    if(dueDateCheck < todayDate){
      toast.error("Due date cannot be a past date",{
        autoClose:1000,
        hideProgressBar:true
      })
      return ;
    }


    AddTask(addTask);
    
  }
  return (
         <form >
        <div className="border h-[95%] w-[350px] rounded-lg flex flex-col items-center justify-evenly bg-[#fff]  shadow-lg ">

          <div className=" w-[300px] flex flex-col gap-1">
            <p className="text-sm">Title</p>
            <input
              type="text"
              name='title'
              value={addTask.title}
              maxLength={50}
              onChange={handleTaskChange}
              className="border border-solid border-gray-300 h-[40px] rounded-lg focus:outline-none px-2"
            />
          </div>

          <div className=" w-[300px] flex flex-col gap-1">
            <p className="text-sm">Description</p>
            <textarea name='description' value={addTask.description} maxLength={100} onChange={handleTaskChange} className=' h-[80px] border rounded-lg resize-none focus:outline-none px-2 py-1'></textarea>
          </div>

          <div className='w-[300px] flex flex-col gap-1'>
            <p className='text-sm'>Due Date</p>
            <input type="date" name='dueDate' value={addTask.dueDate} onChange={handleTaskChange} className='border border-solid border-gray-300 h-[40px] rounded-lg focus:outline-none px-2' />
          </div>

          <button onClick={handleAddTask} className=" w-[300px] h-[40px] text-[#fff] bg-[#7b68ee] font-bold text-md rounded-lg hover:bg-[#644fd8]">
            Add Task
          </button>
        </div>
      </form>

  )
}

export default AddTask
