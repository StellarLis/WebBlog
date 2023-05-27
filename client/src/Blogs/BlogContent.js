import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainContext } from "../App";

const BlogContent = () => {

    const { id } = useParams();
    const [blogBody, setBlogBody] = useState({});

    const backendUrl = useContext(mainContext);
    useEffect(() => {
        axios.get(`${backendUrl}/posts/getOne/${id}`).then(response => {
            setBlogBody(response.data);
        })
    }, [])

    return (
        <div className="bg-gray-800 min-h-screen text-white flex flex-col items-center">
            <h1 className="mt-4 text-3xl">{blogBody.title}</h1>
            <p className="text-sm mt-2">By: {blogBody.creatorEmail}</p>
            <p className="mt-12 max-w-2xl inline">{blogBody.content}</p>
        </div>
    );
}
 
export default BlogContent;