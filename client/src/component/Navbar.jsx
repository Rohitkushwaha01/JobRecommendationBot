import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthenticationContext/auth.context";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const { isAuthenticated, setAuthenticated, currentUser } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
    }

    return (
        <>
            <nav className="navbar">
                <h1>
                    <Link to="/">
                        <i className="fas fa-code"></i> DynamicBot🤖
                    </Link>
                </h1>
            </nav>
        </>
    );
}


export default Navbar;