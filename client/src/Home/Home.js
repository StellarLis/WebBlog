import { Link } from 'react-router-dom';
import Blog from '../Blogs/Blog';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { mainContext } from '../App';

const Home = ({ responseBody }) => {
    const body = responseBody;
    const [blogsArray, setBlogsArray] = useState([]);

    const backendUrl = useContext(mainContext);
    useEffect(() => {
        axios.get(`${backendUrl}/posts/latest`)
            .then(response => {
                setBlogsArray(response.data);
            });
    }, []);

    return (
        <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center">
            <h1 className="text-3xl mt-4">Home Page</h1>
            <p className="mt-4 text-xl">Latest Blogs:</p>
            <div className="mt-2 w-full rounded-lg border-2 border-gray-600">
                { blogsArray.map((blog, i) => (
                    <Link to={`/blog/${blog.id}`}>
                        <Blog key={i} blogBody={blog} isFirst={i === 0 ? false : true} />
                    </Link>
                )) }
            </div>
        </div>
    );
}
 
export default Home;