import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import BlogContext from '../../context/blogcontext';
import BlogCard from '../BlogCard/BlogCard';

const AllBlogs = () => {

  const navigate = useNavigate();

  const context = useContext(BlogContext)
  const {allBlogs,fetchBlogs} = context
 
  


  useEffect(()=>{
    if(!localStorage.getItem('token')){
       navigate('/login')    
    }

    fetchBlogs()
   },[])

   
  return (
    <>
      <Navbar/>
      <div className="personal-blog-container">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 className="section-title">All Blogs</h2>
        {/* <button className="create-blog-button" onClick={handleCreateBlog}>Create New Blog</button> */}
        
        </div>
        
        
        {
         allBlogs.length >0 ? 
        allBlogs.map(blog => (
          
          <BlogCard blog={blog} key={blog._id} />
         
        ))
        :
        <h1 style={{textAlign:"center"}}>No Blogs Found</h1>
        }
      </div>
    </>
  );
};

export default AllBlogs;