import React from "react";
import Trending from "./Trending";
import Popular from "./Popular";
import Discover from "./Discover";

const MoviesList = () => {
    
    return (
        <div className="space-y-10 mt-10 mb-14 ">
            <Trending title="Trending" />
            <Popular title="Popular" />
            <Discover title="Discover" />
        </div>
    );
};

export default MoviesList;
