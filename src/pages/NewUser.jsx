import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { setCookie } from "../cookie/cookie";

const NewUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if(user.length < 3) {
            alert("User id must be at least 3 characters")
            return;
        }

        setCookie(user);
        navigate('/')
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
            <h1 className="text-3xl md:text-4xl">Enter your user id</h1>
            <div className="h-10 md:w-1/2 flex items-center border-0 border-white">
                <input
                    className="bg-transparent border-[1px] focus:border-2 broder-white outline-none px-2 h-full rounded-l-lg w-[80%]"
                    type="text"
                    placeholder="User id"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    // onKeyUp={handleLogin}
                />
                <button
                    className="h-full w-46 md:w-[20%] px-5 bg-slate-300 text-slate-900 font-bold rounded-r-lg active:bg-slate-100"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default NewUser;
