import { Navigate, Outlet } from "react-router-dom";

const Authentication = ({ isLoggedIn, responseBody }) => {
    if (isLoggedIn === null) {
        return null;
    } else if (isLoggedIn) {
        return <Outlet context={responseBody} />
    } else {
        return <Navigate to='/' replace />
    }
}
 
export default Authentication;