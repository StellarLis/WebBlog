import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {

    const handleLogout = (event) => {
        localStorage.removeItem('token');
        window.location.reload(false);
    }

    return (
        <div className="bg-gray-700 text-white flex h-14 items-center">
            <Link to='/' className="text-xl ml-4 font-semibold">SampleBlog2</Link>
            <div className="ml-6 flex justify-end">
                { isLoggedIn ? (
                    <div className="space-x-4">
                        <Link to='/new-blog' className="transition hover:text-blue-500">New Blog</Link>
                        <Link to='/profile' className="transition hover:text-blue-500">Profile</Link>
                        <Link onClick={handleLogout} className="transition hover:text-blue-500">Logout</Link>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link to='/login' className="transition hover:text-blue-500">Log In</Link>
                        <Link to='/register' className="transition hover:text-blue-500">Sign Up</Link>
                    </div>
                ) }
            </div>
        </div>
    );
}
 
export default Navbar;