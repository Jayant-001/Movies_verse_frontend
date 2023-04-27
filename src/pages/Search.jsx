import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFromAPI } from "../api/api";
import { InfinitySpin } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../components/MovieCard";

const Search = () => {
    const { query } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [clickedMovie, setClickedMovie] = useState({
        id: null,
        media_type: null,
    });

    const fetchInitialData = () => {
        setLoading(true);
        fetchFromAPI(`/search/multi?query=${query}&page=${page}`)
            .then((res) => {
                setData(res.data);
                setPage((prev) => prev + 1);
                setLoading(false);
            })
            .catch(() => {
                alert("Server error");
            });
    };

    const fetchNextPage = () => {
        setLoading(true);
        fetchFromAPI(`/search/multi?query=${query}&page=${page}`)
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
                setLoading(false)
            })
            .catch(() => {
                alert("Server error");
            });
    };

    useEffect(() => {
        setPage(1);
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (clickedMovie.id !== null) {
            navigate(`/detail/${clickedMovie.media_type}/${clickedMovie.id}`);
        }
    }, [clickedMovie]);

    return (
        <div className="">
            {loading && (
                <div className="w-screen h-screen flex items-center justify-center">
                    <InfinitySpin width="200" color="#4fa94d" />
                </div>
            )}
            {!loading && (
                <div className="my-14 px-5">
                    {data?.results?.length > 0 ? (
                        <>
                            <h1 className="my-5 text-2xl">
                                Results for{" "}
                                <span className="text-red-500">{query}</span>
                            </h1>
                            <InfiniteScroll
                                dataLength={data?.results?.length || []}
                                next={fetchNextPage}
                                hasMore={page <= data?.total_pages}
                                loader={
                                    <InfinitySpin width="200" color="#4fa94d" />
                                }
                            >
                                <div className="flex flex-wrap space-x-5 space-y-5">
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
                        <span >No result found</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
