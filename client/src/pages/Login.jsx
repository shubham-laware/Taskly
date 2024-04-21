import React, { useContext, useState } from 'react'
import myContext from '../context/myContext.js';
import Nav from '../components/nav/Nav'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

  const {login}=useContext(myContext)

  const navigate=useNavigate();

  const [loginData,setLoginData]=useState({
    email:'',
    password:''
  });

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setLoginData({...loginData,[name]:value});
  };

  const validateEmail=(email)=>{
    const regex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(regex.test(email)){
        return
    }else{
        toast.error('Invalid Email',{
            autoClose:1000,
            hideProgressBar:true
        })
        return
    }
}

const LogIn=async(loginData)=>{

  try {
    const response=await axios.post('http://localhost:8000/login/auth',loginData,{withCredentials:true})
    console.log(response.headers)
    if(response.status===200){
      login();
      navigate('/taskly');
      setLoginData({
        email:'',
        password:''
      })
      toast.success(response.data.msg,{
        autoClose:1000,
        hideProgressBar:true
      })
      
    }
  } catch (error) {
    if(error.response.status===404){
      toast.error(error.response.data.msg,{
        autoClose:1000,
        hideProgressBar:true
      })
      return
    }else if(error.response.status===401){
      toast.error(error.response.data.msg,{
        autoClose:1000,
        hideProgressBar:true
      })
      return
    }else{
      toast.error(error.response.data.msg,{
        autoClose:1000,
        hideProgressBar:true
      })
      return
    };


  }
  
}

  const handleLogin=(e)=>{
    e.preventDefault();
    const {email,password}=loginData;
    
    if(!email || !password){
      toast.error("All fields are required",{
        autoClose:1000,
        hideProgressBar:true
      })
      return;
    };

    validateEmail(email);

    if(password.length<8){
      toast.error("Password must be at least 8 characters long",{
        autoClose:1000,
        hideProgressBar:true
      })
      return;
    }

    LogIn(loginData);
  }
  return (
    <div className='bg-[#fafbfc] h-[100vh] w-[100vw] '>
    <Nav text={"Don't have an account?"} buttonText={"Sign up"}/>
    <div
      className="  h-screen flex justify-center items-center relative"
      style={{ height: "calc(100vh - 100px)" }}
    >
     

      <form >
        <div className=" h-[400px] w-[500px] rounded-md flex flex-col items-center justify-evenly bg-[#fff]  shadow-2xl">
          <p className="text-[30px] font-bold">Welcome Back!</p>

          <div className=" w-[400px] flex flex-col gap-1">
            <p className="text-sm">Email</p>
            <input
              type="text"
              name='email'
              value={loginData.email}
              onChange={handleInputChange}
              className="border border-solid border-gray-300 h-[40px] rounded-lg focus:outline-none px-2"
            />
          </div>

          <div className=" w-[400px] flex flex-col gap-1">
            <p className="text-sm">Password</p>
            <input
              type="password"
              name='password'
              value={loginData.password}
              onChange={handleInputChange}
              minLength={8}
              maxLength={15}
              className="border border-solid border-gray-300 h-[40px] rounded-lg focus:outline-none px-2"
            />
          </div>

          <button onClick={handleLogin} className=" w-[400px] h-[40px] text-[#fff] bg-[#7b68ee] font-bold text-md rounded-lg">
            Login
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
