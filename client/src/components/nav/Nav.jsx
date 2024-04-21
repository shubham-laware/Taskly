import React from 'react';
import { useNavigate } from 'react-router-dom';


function Nav({text,buttonText}) {

    const navigate=useNavigate();

    const handleOnClick=()=>{
        console.log(typeof(buttonText))
        if(buttonText=="Login"){
            console.log('true')
              navigate('/')
        }else{
            navigate('/signup')
        }
    }
  return (
    <nav className=' h-[100px] flex justify-center items-center px-8'>
        <div className=' h-[60px] w-[100%] flex justify-between px-1'>
            <div className='w-[50%] flex items-center justify-start'>
                <button>
                <img src='taskly.png' alt="Taskly"/>

                </button>
            </div>

            <div className='w-[50%] flex items-center justify-end gap-3'>
                <p className='text-[14px] font-medium text-[#292d34]'>{text}</p>
                <button className=' text-[#fff] bg-[#7b68ee] w-[90px] h-[30px] font-bold text-sm rounded-md' onClick={handleOnClick}>{buttonText}</button>
            </div>
        </div>
    </nav>
  )
}

export default Nav
