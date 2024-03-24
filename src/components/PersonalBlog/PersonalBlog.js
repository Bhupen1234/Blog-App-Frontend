import React, { useContext, useEffect, useState } from 'react';
import './PersonalBlog.css'; // Import CSS file for styling
import Navbar from '../Navbar/Navbar';
import BlogCard from '../BlogCard/BlogCard';
import CustomizedDialogs from '../Modal/Modal';
import BlogContext from '../../context/blogcontext';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

import { create } from '@mui/material/styles/createTransitions';
import { useSnackbar } from 'notistack';
import { useNavigate, useNavigation } from 'react-router-dom';

const PersonalBlog= () => {
  // Sample data for personal blogs
//   const context = useContext(CartItemContext);
//   const { addProductToCart } = context;
  const navigate = useNavigate();
  const context = useContext(BlogContext);
  const {fetchBlogs,personalBlogs,setPersonalBlogs,username} = context;


  const [newBlog,setNewBlog]=useState([])
   const enqueueSnackbar = useSnackbar()

  useEffect(()=>{
      fetchBlogs();
  },[]);

  const onDeletePost =async(id)=>{
     try {
      const response =await axios.delete(`${API_BASE_URL}/blogs/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
       })



      
        setPersonalBlogs(response.data.filter(data=> data.userId === localStorage.getItem('userId') ));
      

  
       enqueueSnackbar("Blog Deleted",{variant:"success"});
     } catch (error) {
        // enqueueSnackbar(error.response.data.message,{variant:"error"})
     }
  }


  const createBlog = async()=>{
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs`,{
        title:newBlog.title,
        description:newBlog.description,
        userPicturePath:newBlog.userPicturePath.name
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      })
      const userId = localStorage.getItem('userId')

      setPersonalBlogs(response.data.filter(data=> data.userId === userId));


  
      enqueueSnackbar("Blog Created",{variant:"success"});
    } catch (error) {
      // enqueueSnackbar(error.response.data.message,{variant:"error"})

      console.log(error)
    }
    
  }


  useEffect(()=>{
     createBlog()
  },[newBlog])


  useEffect(()=>{
   if(!localStorage.getItem('token')){
      navigate('/login')    
   }
  },[])
  

  return (
    <>
      <Navbar username={username}/>
      <div className="personal-blog-container">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 className="section-title">Personal Blogs</h2>
        {/* <button className="create-blog-button" onClick={handleCreateBlog}>Create New Blog</button> */}
        <CustomizedDialogs className="create-blog-button" setNewBlog={setNewBlog}/>
        </div>
        
        
        {
         personalBlogs.length >0 ? 
        personalBlogs.map(blog => (
          
          <BlogCard blog={blog} key={blog._id} onDeletePost={onDeletePost}/>
         
        ))
        :
        <h1 style={{textAlign:"center"}}>No Blogs Found</h1>
        }
      </div>
    </>
  );
};

export default PersonalBlog;
