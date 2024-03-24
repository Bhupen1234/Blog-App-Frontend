import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import PersonalBlog from '../PersonalBlog/PersonalBlog';
import AllBlogs from '../AllBlogs/AllBlogs';
import { useNavigate } from 'react-router-dom';



const Dashboard = ({ username }) => {

const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('token')){
       navigate('/login')
    }
  },[])
 
  return (
    <div>
      <Navbar username={username}/>
      <div className="dashboard-container">
       
      </div>
    </div>
  );
};

export default Dashboard;