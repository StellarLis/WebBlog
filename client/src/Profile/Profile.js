import { Link, useOutletContext } from "react-router-dom";
import Blog from "../Blogs/Blog";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { mainContext } from "../App";

const Profile = () => {
    const body = useOutletContext();
    const [blogsArray, setBlogsArray] = useState([]);

    const backendUrl = useContext(mainContext);
    useEffect(() => {
        axios.get(`${backendUrl}/posts/${body.userId}`)
            .then(response => {
                const arr = response.data;
                arr.reverse();
                setBlogsArray(arr);
            });
    }, []);

    return (
        <div className="flex flex-col items-center bg-gray-800 min-h-screen text-white">
            <h1 className="mt-4 text-3xl">Your Profile</h1>
            <p className="mt-4 text-xl">Email: {body.email}</p>
            <p className="mt-16 text-xl">Current blogs:</p>
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
 
export default Profile;