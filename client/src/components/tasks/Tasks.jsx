import React, { useContext, useEffect, useState } from 'react';
import noTask from '../../assets/no-task.jpg'
import threeDots from '../../assets/three-dots.svg';
import myContext from '../../context/myContext.js';
import Options from '../options/Options.jsx';
import axios from 'axios';

function Tasks({tasks}) {


   const {optionsIndex,handleOptions}=useContext(myContext);

    
  return (
    <div className=' h-[95%] w-[71%] rounded-lg bg-[#fff]  shadow-lg  flex flex-col gap-5 rounded-t-lg '>

        <div className='flex justify-between border h-[60px] items-center px-2 pr-2  bg-[#7b68ee] text-[#fff] rounded-t-md gap-3 text-sm relative fixed top-0 '>
            <p className=' w-[70px] text-center'>Sr. No</p>
            <p className=' w-[300px] text-center '>Title</p>
            <p className=' w-[300px] text-center '>Description</p>
            <p className=' w-[120px]  text-center '> Assign Date</p>
            <p className=' w-[120px] text-center '>Due Date</p>
            <p className=' w-[100px]  text-center'>Status</p>
            <button className='w-[30px]  pr-2'></button>
        </div>

        <div className=' h-[100%] overflow-scroll overflow-x-hidden scrollbar-none pb-2 flex flex-col gap-8'>

            {
                tasks && tasks.length>0 ?(
                    tasks.map((task,index)=>(
                    <div key={index} className='flex justify-between  min-h-[40px] items-center  px-1 pr-2 gap-3 text-sm  py-2 relative'>
                    <p className=' w-[70px] text-center'>{index+1}.</p>
                    <p className=' w-[300px]  text-center   '>{task.title}</p>
                    <p className=' w-[300px] text-center '>{task.description}</p>
                    <p className=' w-[120px] text-center '> {task.assignDate}</p>
                    <p className=' w-[120px]  text-center '>{task.dueDate}</p>
                        {task.isCompleted?(<p className=' w-[100px]  text-center text-green-500 font-bold'>Completed</p>):(
                            <p className=' w-[100px]  text-center text-red-500 font-bold'>Incomplete</p>
                        )}
                  
                    <button onClick={()=>handleOptions(index)} className='w-[30px]  pr-2'>
                        <img src={threeDots} alt="..." className=' w-[100%]'></img>
                    </button>
                    {
                        index===optionsIndex &&<Options taskIndex={index} />

                    }
                </div>
                ))):(
                <div className='h-[100%] w-[100%] flex justify-center '>
            <img src={noTask} alt="NoTask" className='h-[100%] w-[85%]' />
            </div>
                )
            }
            
            


        </div>
        

    </div>
  )
}

export default Tasks



        