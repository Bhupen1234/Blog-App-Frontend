import React, { useEffect, useState } from 'react';
import "./Register.css"
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const Register = () => {

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/allblogs')
        }
    },[])
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  
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

         const response = await axios.post(`${API_BASE_URL}/users/register`,formData);
         alert(response.data.message);
         enqueueSnackbar("You have been registered",{variant:"success"})
         navigate('/login');
      } catch (error) {
        enqueueSnackbar(error.response.data.message,{variant:"error"})
      }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    await performAPICall(formData);
    
    // Reset form fields after submission
    setFormData({
      username: '',
      email: '',
      password: '',
      
    });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register for Our QBlog Application</h2>
        <form onSubmit={async(e)=>await handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
          
          <button type="submit">Register</button>
        </form>
        <p style={{fontWeight:"bolder"}}>Already registered? <span style={{color:"#5574c6",cursor:"pointer"}} onClick={()=>navigate("/login")}>Login here</span></p>
      </div>
    </div>
  );
};

export default Register;
