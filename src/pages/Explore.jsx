import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFromAPI } from "../api/api";
import { InfinitySpin } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../components/MovieCard";
import toast, { Toaster } from "react-hot-toast";

const Explore = () => {
    const { mediaType } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [clickedMovie, setClickedMovie] = useState({
        id: null,
        media_type: mediaType,
    });

    const fetchInitialData = () => {
        setLoading(true);
        fetchFromAPI(`/${mediaType}/top_rated`)
            .then((res) => {
                setData(res.data);
                setPage((prev) => prev + 1);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Server error");
            });
    };

    const fetchNextPage = () => {
        fetchFromAPI(`/${mediaType}/top_rated?page=${page}`)
            .then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.data.results],
                    });
                } else {
                    setData(res.data);
                }
                setPage((prev) => prev + 1);
   
            })
            .catch(() => {
                toast.error("Server error");
            });
    };

    useEffect(() => {
        setPage(1);
        fetchInitialData();
    }, [navigate]);

    useEffect(() => {
        if (clickedMovie.id !== null) {
            navigate(`/detail/${clickedMovie.media_type}/${clickedMovie.id}`);
        }
    }, [clickedMovie]);

    return (
        <div className="">
            <Toaster position="top-center" />
            {loading && (
                <div className="w-screen h-screen flex items-center justify-center">
                    <InfinitySpin width="200" color="#4fa94d" />
                </div>
            )}
            {!loading && (
                <div className="mt-14 px-5">
                    {data?.results?.length > 0 ? (
                        <>
                            <h1 className="my-1 text-xl">
                                Top Rated{" "}
                                <span className="text-red-500">
                                    {mediaType}
                                    {mediaType === "movie" && "s"}
                                </span>
                                {mediaType === "tv" && " shows"}
                            </h1>
                            <InfiniteScroll
                                dataLength={data?.results?.length || []}
                                next={fetchNextPage}
                                hasMore={page <= data?.total_pages}
                                loader={
                                    <InfinitySpin width="200" color="#4fa94d" />
                                }
                            >
                                <div className="h-fit mt-0 flex flex-wrap justify-evenly items-center gap-3 space-y-3">
                                    {data?.results?.map((item, index) => {
                                        if (item.media_type === "person")
                                            return <div key={index}></div>;
                                        return (
                                            <MovieCard
                                                key={index}
                                                movie={item}
                                                clickedMovie={clickedMovie}
                                                setClickedMovie={
                                                    setClickedMovie
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span>No result found</span>
                    )}
                </div>
            )}
        </div>

        // <div className=" mx-5 mt-14">
        //     <h1 className="text-2xl">
        //         All{" "}
        //         <span className="text-red-500">
        //             {" "}
        //             {mediaType}
        //             {mediaType === " tv" ? "shows" : "s"}
        //         </span>
        //         {data?.results?.map((item, index) => {
        //             return (
        //                 <div key={index} className="">
        //                     <h1>{item.original_title || item.title}</h1>
        //                 </div>
        //             );
        //         })}
        //     </h1>
        // </div>
    );
};

export default Explore;
