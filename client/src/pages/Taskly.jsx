import React, { useEffect, useState } from 'react'
import TasklyNav from '../components/tasklyNav/TasklyNav'
import AddTask from '../components/addTask/AddTask'
import Tasks from '../components/tasks/Tasks'
import axios from 'axios'

function Taskly() {



  const [userData,setUserData]=useState('');

  const fetchData=async()=>{
    const response=await axios.get('http://localhost:8000/get/tasks',{
        withCredentials:true
    });
    if(response.status===200){
        // console.log(response.data)
        setUserData(response.data)
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

 
  
  return (
    <div className='border h-[100vh] w-[100vw] bg-[#fafbfc]'>
        <TasklyNav initials={userData.name}/>
        <div className=' px-9 flex gap-6  pt-2' style={{height: 'calc(100vh - 101px)'}}>
            <Tasks tasks={userData.allTasks}/>
            <AddTask fetchData={fetchData} />
        </div>
    </div>
  )
}

export default Taskly
