import React, { useState } from 'react'
import BlogContext from './blogcontext'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const BlogState = ({children}) => {

    const [allBlogs,setAllBlogs] = useState([]);
    const [personalBlogs,setPersonalBlogs] = useState([]);
    const [username,setUserName] = useState("");
   
    const [token,setToken] = useState(localStorage.getItem('token'));

    const enqueueSnackbar = useSnackbar();

    const fetchBlogs = async()=>{
        try {
           const response = await axios.get(`${API_BASE_URL}/blogs/`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
           });
          const userId = localStorage.getItem('userId');
          setAllBlogs(response.data);
          const personalBlogsData  =response.data.filter(data=> data.userId === userId);

          setPersonalBlogs(personalBlogsData);
        

        } catch (error) {
            //  enqueueSnackbar(error, {
            //     variant: 'error',
            //   });

            // enqueueSnackbar(error.response.data.message,{variant:"error"})

            alert(error.response.data.message)
        }

    }

     


    

    
  return (
    <BlogContext.Provider  value={{fetchBlogs,personalBlogs,setPersonalBlogs,allBlogs}}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogState
