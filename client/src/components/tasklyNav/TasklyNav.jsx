import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/myContext.js';

function TasklyNav({initials}) {
  const [initialName, setInitialName] = useState('U');

  useEffect(() => {
    if (initials) {
      const nameParts = initials.split(" ");
      const initialsArr = nameParts.map((part) => part.charAt(0));
      setInitialName(initialsArr.join(" ").toUpperCase());
    }
  }, [initials]);
  
  


  const {logout}=useContext(myContext);

  const handleLogout=(e)=>{
    e.preventDefault();
    logout();

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
            <p className='text-[14px] font-medium text-[#fff] border w-[45px] h-[40px] flex justify-center items-center rounded-[100%] bg-[#7b68ee]'>{initialName}</p>
            <button onClick={handleLogout} className=' text-[#fff] bg-[#7b68ee] w-[90px] h-[30px] font-bold text-sm rounded-md hover:bg-[#644fd8]' >Logout</button>
        </div>
    </div>
</nav>
  )
}

export default TasklyNav
