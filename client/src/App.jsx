
import { useContext, useEffect } from 'react';
import myContext from './context/myContext.js';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Taskly from './pages/Taskly';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const {isLoggedIn,setIsLoggedIn} =useContext(myContext);


  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
   
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/taskly' element={isLoggedIn ?<Taskly/>:<Login/>}/>
      </Routes>
      <ToastContainer/>

    </Router>
  )
}

export default App
