import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };
    return (
        <div className="flex flex-col h-full w-full items-center justify-center space-y-2">
            <h1 className="text-3xl">
                Hello Dear, wrong address
            </h1>
            <h3 className="text-xl">
                Run to <span onClick={handleClick} className="underline text-slate-200 font-semibold cursor-pointer">Home</span>
            </h3>
        </div>
    );
};

export default PageNotFound;
