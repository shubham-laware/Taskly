import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import myContext from "../../context/myContext.js";
import cancelIcon from "../../assets/cancel-icon.svg";

function Options({taskIndex}) {

  const [optionsVisibility, setOptionsVisibility] = useState("hidden");
  

  const{handleCancel,optionsIndex}=useContext(myContext);

  useEffect(() => {
    setOptionsVisibility(taskIndex === optionsIndex ? "block" : "hidden");
  }, [taskIndex, optionsIndex]);

  const handleMarkComplete=async()=>{
    try {
      console.log('clicked')
      const response=await axios.post('http://localhost:8000/mark/complete',{
        withCredentials:true
    })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`flex gap-2 text-xs absolute right-0 top-2 bg-[#fff] shadow-2xl rounded-lg pr-2 ${optionsVisibility} z-10 `}
    >
      <button onClick={handleCancel} className="w-[20px]  h-[20px] mt-1">
        <img src={cancelIcon} alt="X" />
      </button>

      <div className="flex flex-col gap-2 py-2">
        <button className=" w-[100px] bg-[#7761f0] h-[30px] rounded-md text-[#fff] hover:bg-[#8975f7]"
        onClick={handleMarkComplete}
        >
          Mark Complete
        </button>
        <button className=" w-[100px] bg-[#7761f0] h-[30px] rounded-md text-[#fff] hover:bg-[#8975f7]">
          Update
        </button>
        <button className=" w-[100px] bg-[#7761f0] h-[30px] rounded-md text-[#fff] hover:bg-[#8975f7]">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Options;
