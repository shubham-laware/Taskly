import React, { useState } from 'react'
import Nav from '../components/nav/Nav';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate=useNavigate();
    const [userData,setUserData]=useState({
        fullName:'',
        email:'',
        confirmedPassword:'',
        tasks:[]
    });
    
    const [initialPassword,setInitialPassword]=useState('');

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setUserData({...userData,[name]:value})
    }

    const validateEmail=(email)=>{
        const regex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if(regex.test(email)===true){
            return
        }else{
            toast.error('Invalid Email',{
                autoClose:1000,
                hideProgressBar:true
            })
            return
        }
    }

    const SignUp=async(userData)=>{
      try {
        const response=await axios.post('http://localhost:8000/signup/new-user',userData)
        if(response.status==201){
          setUserData({
            fullName:'',
            email:'',
            confirmedPassword:'',
            tasks:[]
        })
          navigate('/')
          toast.success(response.data.msg,{
            autoClose:1000,
            hideProgressBar:true
          })
        }
      } catch (error) {
        if(error.response && error.response.status===400){
          toast.error(error.response.data.msg,{
            autoClose:1000,
            hideProgressBar:true
          })
        }
        if(error.response && error.response.status===500){
          toast.error(error.response.data.msg,{
            autoClose:1000,
            hideProgressBar:true
          })
        }
      }
     
    }

    const handleSignup=(e)=>{
        e.preventDefault();
        const {fullName,email,confirmedPassword}=userData;

        if(!fullName || !email ||!confirmedPassword || !initialPassword){
            toast.warning('All fields are required',{
                autoClose:1000,
                hideProgressBar:true
            });
            return

        }

        validateEmail(email);


        if(initialPassword.length<8 || confirmedPassword.length <8){
            toast.error('Password must be atleast 8 characters long',{
                autoClose:1000,
                hideProgressBar:true
            });
            return
        }

        if(initialPassword!==userData.confirmedPassword){
            console.log('mismatched')
            toast.error('Both password must be same',{
                autoClose:1000,
                hideProgressBar:true
            })
            return 
        }
        SignUp(userData);
    }
    return (
        <div className='bg-[#fafbfc] h-[100vh] w-[100vw] '>
            <Nav text={"Already have an account?"} buttonText={"Login"}/>
        <div
          className=" h-screen flex justify-center items-center relative"
          style={{ height: "calc(100vh - 100px)" }}
        >
         
    
          <form>
            <div className=" h-[500px] w-[500px] rounded-md flex flex-col items-center justify-evenly bg-[#fff]  shadow-2xl">
              <p className="text-[30px] font-bold">Let's Go!</p>
    
              <div className=" w-[400px] flex flex-col gap-1">
                <p className="text-sm">Full Name</p>
                <input
                  type="text"
                  maxLength={25}
                  name='fullName'
                  value={userData.fullName}
                  onChange={handleInputChange}
                  className="border border-solid border-gray-300 h-[40px] rounded-lg focus:outline-none px-2"
                />
              </div>

              <div className=" w-[400px] flex flex-col gap-1">
                <p className="text-sm">Email</p>
                <input
                  type="text"
                  maxLength={30}
                  name='email'
                  value={userData.email}
                  onChange={handleInputChange}
                  className="border border-solid border-gray-300 h-[40px] rounded-lg focus:outline-none px-2"
                />
              </div>
    
              <div className=" w-[400px] flex flex-col gap-1">
                <p className="text-sm">Password</p>
                <input
                  type="password"
                  minLength={8}
                  maxLength={15}
                  name='initialPassword'
                  value={initialPassword}
                  onChange={(e)=>setInitialPassword(e.target.value)}
                  className="border border-solid border-gray-300 h-[40px] rounded-lg focus:outline-none px-2"
                />
              </div>

              <div className=" w-[400px] flex flex-col gap-1">
                <p className="text-sm">Confirm Password</p>
                <input
                  type="password"
                  name='confirmedPassword'
                  value={userData.confirmedPassword}
                  minLength={8}
                  maxLength={15}
                  onChange={handleInputChange}
                  className="border border-solid border-gray-300 h-[40px] rounded-lg focus:outline-none px-2"
                />
              </div>
              
    
              <button onClick={handleSignup} className=" w-[400px] h-[40px] text-[#fff] bg-[#7b68ee] font-bold text-md rounded-lg">
                Signup
              </button>
            </div>
          </form>
        </div>
        </div>
      );
}

export default Signup
