import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './Auth/Authentication';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import Navbar from './Home/Navbar';
import NewBlog from './Blogs/NewBlog';
import BlogContent from './Blogs/BlogContent';

export const mainContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [responseBody, setResponseBody] = useState({});

    const backend_host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_HOST : process.env.REACT_APP_PROD_BACKEND_HOST;
    const backend_port = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_PORT : process.env.REACT_APP_PROD_BACKEND_PORT;
    const httpOrHttps = process.env.NODE_ENV === 'development' ? 'http' : 'http';

    const backendUrl = `${httpOrHttps}://${backend_host}:${backend_port}`;

  useEffect(() => {
      axios.get(`${backendUrl}/auth/authenticate`, {
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
    <mainContext.Provider value={backendUrl}>
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
    </mainContext.Provider>
  );
}

export default App;
