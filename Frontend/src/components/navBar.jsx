import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    // Check if user is logged in (e.g., if "user" exists in localStorage)
    const isLoggedIn = localStorage.getItem("user");

    return (
        <nav className="bg-[#000000dc] p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <img src="/geckLogo.png" alt="Logo" className="h-8 w-8 mr-2" />
                    <span className="text-white text-lg font-semibold">
                        Government Engineering College (GEC), Kishanganj
                    </span>
                </div>

                {/* Show Login/Register only if NOT logged in */}
                {!isLoggedIn && (
                    <div className="hidden md:flex space-x-4">
                        <Link to="/">
                            <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="text-white bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded">
                                Register
                            </button>
                        </Link>
                    </div>
                )}

                {/* Logout Button for Logged-in Users */}
                {isLoggedIn && (
                    <button
                        onClick={() => {
                            localStorage.removeItem("user"); // Remove user data
                            window.location.reload(); // Refresh to update UI
                        }}
                        className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
