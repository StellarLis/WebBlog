import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './Auth/Authentication';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from './Home/Navbar';
import NewBlog from './Blogs/NewBlog';
import BlogContent from './Blogs/BlogContent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [responseBody, setResponseBody] = useState({});

  useEffect(() => {
      axios.get('http://localhost:5000/auth/authenticate', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      }).then(response => {
          setResponseBody(response.data);
          setIsLoggedIn(true);
      }).catch(() => {
          setIsLoggedIn(false);
      });
  }, []);
  return (
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='/' element={<Home responseBody={responseBody} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Authentication isLoggedIn={isLoggedIn} responseBody={responseBody} />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/new-blog' element={<Authentication isLoggedIn={isLoggedIn} responseBody={responseBody} />}>
          <Route path='/new-blog' element={<NewBlog />} />
        </Route>
        <Route path='/blog/:id' element={<BlogContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
