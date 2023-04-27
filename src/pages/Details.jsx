import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../api/useFetch";
import { useSelector } from "react-redux";
import Recommendations from "../components/Recommendations";
import axios from "axios";
import { getCookie } from "../cookie/cookie";
import { InfinitySpin } from "react-loader-spinner";

const getEndPoints = (location) => {
    const urlPath = location.pathname.split("/");
    const mediaId = urlPath.pop();
    const mediaType = urlPath.pop();

    return { mediaId, mediaType };
};

const Details = () => {
    const location = useLocation();
    const { mediaId, mediaType } = getEndPoints(location);
    const url = useSelector((state) => state.home.url.imageUrl);

    const { data, loading } = useFetch(`/${mediaType}/${mediaId}`);
    const user = getCookie();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setIsAuthenticated(false);
    }, [mediaId]);

    useEffect(() => {
        if (user) {
            axios
                .get(`${process.env.REACT_APP_SERVER_URI}/api/get/${user}`)
                .then((res) => {
                    res?.data?.movies?.forEach((element) => {
                        if (
                            element.mediaId === mediaId &&
                            element.mediaType === mediaType
                        ) {
                            setIsAuthenticated(true);
                            return;
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            setIsAuthenticated(false);
        }
    }, [location, user, mediaId, clicked]);

    const addToWatchlist = async () => {
        if (user !== undefined && user !== null) {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URI}/api/set/${user}`,
                {
                    mediaType,
                    mediaId,
                }
            );
        } else {
            alert("Login to save movies");
        }
        // to update add watchlist button
        setClicked(!clicked);
    };

    return (
        <>
            {loading && (
                <div className="w-screen h-screen flex items-center justify-center">
                    <InfinitySpin width="200" color="#4fa94d" />
                </div>
            )}
            {!loading && (
                <div className="flex flex-col px-14 py-10 space-y-6 h-screen mt-10">
                    {/* Movie details */}
                    <div className="flex space-x-5">
                        <img
                            className="w-52 rounded-xl"
                            alt=""
                            src={`${url + data?.poster_path}`}
                        />
                        <div className="flex flex-col space-y-2 text-lg">
                            <h1 className="text-5xl">
                                {data?.original_title ||
                                    data?.title ||
                                    data?.name}
                            </h1>
                            <p className="text-2xl text-slate-300">
                                {data?.overview}
                            </p>
                            <div className="">
                                <div className="">
                                    <span>Genres: </span>
                                    {data?.genres.map((genre) => {
                                        return (
                                            <span
                                                className="bg-slate-500 mx-2 rounded-lg px-2 text-center"
                                                key={genre.id}
                                            >
                                                {genre.name}
                                            </span>
                                        );
                                    })}
                                </div>
                                <h1>Status: {data?.status}</h1>
                                <div className="">
                                    {mediaType === "tv" ? (
                                        <div className="">
                                            <p>
                                                Number of seasons{" "}
                                                {data?.number_of_seasons}
                                            </p>
                                            <p>
                                                Number of episodes{" "}
                                                {data?.number_of_episodes}
                                            </p>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <button
                                    onClick={addToWatchlist}
                                    className="bg-blue-600 rounded-xl shadow-xl px-2 py-1 mt-2 active:bg-blue-700 "
                                >
                                    {!isAuthenticated
                                        ? "Add to"
                                        : "Remove from"}{" "}
                                    watchlist
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Movie recommendation */}
                    <div className="text-4xl h-screen mt-12">
                        <Recommendations
                            media_type={mediaType}
                            media_id={mediaId}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Details;
