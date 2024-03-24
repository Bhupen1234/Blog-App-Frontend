import React, { useEffect, useState } from 'react';
import "./Login.css"
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Navbar from '../Navbar/Navbar';


const Login = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/personalBlogs')
        }
    },[])
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const performAPICall = async(formData)=>{
    try {

       const response = await axios.post(`${API_BASE_URL}/users/login`,formData);
     const {token,userId,username} = response.data;

     localStorage.setItem('token',token);
     localStorage.setItem('userId',userId);
     localStorage.setItem('username',username);

    enqueueSnackbar("Login success", { variant: "success" })
     navigate('/personalblogs');
       
      
    } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" })
    }
}
   


  const handleSubmit = async(e) => {
    e.preventDefault();
      
     await performAPICall(formData);

    setFormData({
      email: '',
      password: ''
    });
  };

  return (
   <>
  
    <div className="login-page">
     
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <form onSubmit={async(e)=>await handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p style={{fontWeight:"bolder"}}>New User? <span style={{color:"#5574c6",cursor:"pointer"}} onClick={()=>navigate("/")}>Register here</span></p>
      </div>
    </div>
    </>
  );
};

export default Login;