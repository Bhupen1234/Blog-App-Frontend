import logo from './logo.svg';
import './App.css';
import Register from './components/Register/Register';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import AllBlogs from './components/AllBlogs/AllBlogs';
import PersonalBlog from './components/PersonalBlog/PersonalBlog';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />}/>
       
        <Route path='/allblogs' element={<AllBlogs/>}/>
        <Route path='/personalblogs' element={<PersonalBlog/>}/>
       
      </Routes>


     
     
    </div>
  );
}

export default App;
