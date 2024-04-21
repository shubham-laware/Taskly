import React, { useEffect, useState } from 'react'
import myContext from './myContext.js';

function MyState({children}) {

  const [addTask,setAddTask]=useState({
    title:'',
    description:'',
    dueDate:''
  });

    // const [tasks,setTasks]=useState([1,2,3,4,5])

    const [optionsIndex, setOptionsIndex] = useState(null);


    const handleOptions=(index)=>{
      setOptionsIndex(index);
    }

    const handleCancel=()=>{
      setOptionsIndex(null);

    }
   

    const [isLoggedIn,setIsLoggedIn]=useState(false);
    

    const login = () => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn','true');
      };

      const logout = () => {
            setIsLoggedIn(false);
            sessionStorage.removeItem('isLoggedIn');
      };

  return (
    <myContext.Provider value={{optionsIndex,handleOptions,handleCancel,addTask,setAddTask,isLoggedIn,setIsLoggedIn,login,logout}} >
        {children}
    </myContext.Provider>
  )
}

export default MyState;
