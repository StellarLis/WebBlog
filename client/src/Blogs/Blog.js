const Blog = ({ blogBody, isFirst }) => {
    return (
        <div>
            { isFirst && <div className="w-full h-1 bg-gray-600" /> }
            <div className="flex flex-col items-center py-4 transition hover:bg-gray-600">
                <p className="font-semibold">{blogBody.title}</p>
                <p className="">By: {blogBody.creatorEmail}</p>
            </div>
        </div>
    );
}
 
export default Blog;