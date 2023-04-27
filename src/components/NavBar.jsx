import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {getCookie} from '../cookie/cookie'

const NavBar = () => {
    const navigate = useNavigate();
    const cookie = getCookie();

    const handleNavigation = (type) => {
        navigate(`explore/${type}`);
    };

    return (
        <div className="fixed w-full top-0 z-10 bg-transparent flex justify-between items-center text-md px-16 py-2 border-b-[1px] border-slate-100">
            <div className="cursor-pointer text-2xl" onClick={() => navigate('/')}>Movie<span className="text-red-500">s Co</span>rner</div>
            <ul className="hidden sm:flex space-x-8">
                <li className="cursor-pointer hover:text-indigo-200 hover:underline">
                    <Link to="/">Home</Link>
                </li>
                <li
                    onClick={() => handleNavigation("movie")}
                    className="cursor-pointer hover:text-indigo-200 hover:underline"
                >
                    <Link>Movies</Link>
                </li>
                <li
                    onClick={() => handleNavigation("tv")}
                    className="cursor-pointer hover:text-indigo-200 hover:underline"
                >
                    <Link>Tv shows</Link>
                </li>
                <li className="cursor-pointer hover:text-indigo-200 hover:underline">
                    <Link to="/myfavourite">Favourite</Link>
                </li>
                <li className="cursor-pointer hover:text-indigo-200 hover:underline">
                    <Link to="/authenticate">{cookie ? "Logout" : "Login"}</Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;
