import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllBlogs from './pages/AllBlogs';
import Blog from './pages/Blog';
import Login from './pages/Login';
import AddBlog from './pages/AddBlog';
import ResponsiveAppBar from './components/NavBar';


function App() {
  return (
    <>
       <header>
        <div class="container">
            <div class="logo">PETER SPEAR</div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </div>
    </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllBlogs />} />
          <Route path="/Blog/:blog_id" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addblog" element={<AddBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
