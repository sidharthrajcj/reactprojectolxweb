import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Signup from './Pages/Signup'
import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import {AuthContext} from './Store/FirebaseContext';
import Create from './Pages/Create';
import View from './Components/View/View'; 
import {auth} from './Firebase/config'
import Posts from './Components/Posts/Posts';

function App() {

  const{setUser}=useContext(AuthContext)
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((user)=>{
      setUser(user);
    });
    return()=>unsubscribe();
    },[setUser]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />} />
          <Route path='/posts' element={<Posts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
