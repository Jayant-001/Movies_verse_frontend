import React, { useState, useEffect } from "react";
import useFetch from "../api/useFetch";
import SwitchTab from "./SwitchTab";
import Carousel from "./Carousel";

const Trending = ({ title }) => {
    const endPoints = ["All", "Movie", "TV"];
    const [endPoint, setEndPoint] = useState("all");

    const [moviesData, setMoviesData] = useState([]);

    const { data, loading } = useFetch(`/trending/${endPoint}/week`);

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

export default Trending;

// /trending/{media_type}/{time_window}

// type: all, movie, tv, person
// time_window: day, week

// /movie/{movie_id}
// /movie/popular
// /movie/upcoming
// /movie/latest
// /movie/{movie_id}/similar

// /tv/{tv_id}
// /tv/popular
// /tv/top_rated
// /tv/latest
// /tv/{tv_id}/similar
