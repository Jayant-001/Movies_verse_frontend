import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../api/useFetch";

const Hero = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const handleSearchQuery = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`search/${query}`);
        }
    };

    const handleSearch = () => {};

    return (
        <div className="w-full h-2/3 flex flex-col items-center justify-center space-y-5">
            <h1 className="text-3xl md:text-4xl">Millions of Movies</h1>
            <p className="text-lg text-slate-300 md:text-xl w-1/2 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                necessitatibus quos dolorum? Impedit tempore.
            </p>
            <div className="h-10 md:w-1/2 flex items-center border-0 border-white">
                <input
                    className="bg-transparent border-[1px] focus:border-2 broder-white outline-none px-2 h-full rounded-l-lg w-[80%]"
                    type="text"
                    placeholder="Search movies or tv shows"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={handleSearchQuery}
                />
                <button
                    className="h-full w-46 md:w-[20%] px-5 bg-slate-300 text-slate-900 font-bold rounded-r-lg active:bg-slate-100"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Hero;
