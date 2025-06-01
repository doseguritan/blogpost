import {use, useEffect, useMemo, useState} from 'react';
import Navbar from './components/Navbar';
import BlogForm from './components/BlogForm';
import { Outlet } from 'react-router';

const App = () => {
    const [showBlogForm, setShowBlogForm] = useState(false);
    return <>
        <Navbar showBlogForm={setShowBlogForm} />
        <Outlet />
        {showBlogForm && <BlogForm showBlogForm={setShowBlogForm} />}
    </>
}

export default App;