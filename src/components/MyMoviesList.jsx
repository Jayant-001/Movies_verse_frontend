import React, { useEffect, useState } from "react";
import useFetch from "../api/useFetch";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

const getName = (name) => {
    const arr = name.split(" ");
    let newName = "";
    for (let i = 0; i < Math.min(arr.length, 5); i++) {
        newName = newName.concat(" ", arr[i]);
    }
    return newName;
};

const MyMoviesList = ({ element }) => {
    const { data } = useFetch(
        `/${element.mediaType}/${element.mediaId}`
    );

    const navigate = useNavigate();
    const [movie, setMovie] = useState(false);
    const [clickedMovie, setClickedMovie] = useState({
        id: null,
        media_type: element.mediaType,
    });

    const url = useSelector((state) => state.home.url.imageUrl);

    useEffect(() => {
        setMovie(true);
    }, [data]);

    useEffect(() => {
        if (clickedMovie.id !== null) {
            navigate(`/detail/${clickedMovie.media_type}/${clickedMovie.id}`);
        }
        
    }, [clickedMovie]);

    return (
        <div className="mt-1">
            {movie && data !== undefined && data !== null ? (
                <MovieCard
                    movie={data}
                    clickedMovie={clickedMovie}
                    setClickedMovie={setClickedMovie}
                />
            ) : (
                <h1>loading</h1>
            )}
        </div>
    );
};

export default MyMoviesList;
