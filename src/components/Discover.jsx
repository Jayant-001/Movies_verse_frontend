import React, { useState, useEffect } from "react";
import useFetch from "../api/useFetch";
import SwitchTab from "./SwitchTab";
import Carousel from "./Carousel";

const Discover = ({ title }) => {
    const endPoints = ["Movie", "TV"];
    const [endPoint, setEndPoint] = useState("movie");

    const [moviesData, setMoviesData] = useState([]);

    const { data, loading } = useFetch(`/discover/${endPoint}`);

    useEffect(() => {
        setMoviesData(data?.results);
    }, [data]);

    return (
        <div>
            <div className="px-20 space-y-3">
                <div className="flex justify-between border-0 border-white">
                    <span className="text-2xl backdrop-blur-sm bg-white/30 px-3 py-1 h-fit rounded-lg">
                        {title}
                    </span>
                    <SwitchTab
                        endPoints={endPoints}
                        setEndPoint={setEndPoint}
                    />
                </div>
                <Carousel
                    movies={moviesData}
                    loading={loading}
                    type={endPoint}
                />
            </div>
        </div>
    );
};

export default Discover;
