import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import { InfinitySpin } from "react-loader-spinner";

const Carousel = ({ movies, loading, type }) => {
    const carouselDiv = useRef();
    const navigate = useNavigate();

    const [clickedMovie, setClickedMovie] = useState({
        id: null,
        media_type: type,
    });

    const scrollList = (direction) => {
        // console.log(direction);
    };

    useEffect(() => {
        setClickedMovie({
            id: null,
            media_type: type,
        });
    }, [type]);

    useEffect(() => {
        // console.log(clickedMovie)
        if (clickedMovie.id !== null) {
            navigate(`/detail/${clickedMovie.media_type}/${clickedMovie.id}`);
        }
        // if(clickedMovie.id !== null) {

        //         setClickedMovie({
        //             id: null,
        //             media_type: null,
        //         })
        // }
    }, [clickedMovie]);

    return (
        <div
            className="w-full border-0 border-white relative min-h-[200px]"
            ref={carouselDiv}
        >
            <button
                onClick={() => scrollList("left")}
                className="backdrop-blur-sm bg-white/30 w-8 h-8 absolute my-auto mx-auto left-3 top-0 bottom-0 z-10 rounded-full "
            >
                {"<"}
            </button>
            <button
                onClick={() => scrollList("right")}
                className="backdrop-blur-sm bg-white/30 w-8 h-8 absolute my-auto mx-auto right-3 top-0 bottom-0 z-10 rounded-full "
            >
                {">"}
            </button>
            {!loading || loading === false ? (
                <div
                    style={style}
                    className="movieItems flex gap-5 overflow-y-hidden rounded-xl border-0 border-white no-scrollbar"
                >
                    {movies?.map((movie, index) => {
                        return (
                            <MovieCard
                                key={index}
                                clickedMovie={clickedMovie}
                                setClickedMovie={setClickedMovie}
                                movie={movie}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="absolute left-[50%] top-[50%]">
                    <InfinitySpin width="200" color="#4fa94d" />
                </div>
            )}
        </div>
    );
};

const style = {
    OverflowStyle: "none",
    rollbarWidth: "none",
};

export default Carousel;
