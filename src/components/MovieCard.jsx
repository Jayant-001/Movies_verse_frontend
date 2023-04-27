import React from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import poster_fallout_image from '../assets/poster_fallout.jpg'

const getName = (name) => {
    const arr = name.split(" ");
    let newName = "";
    for (let i = 0; i < Math.min(arr.length, 5); i++) {
        newName = newName.concat(" ", arr[i]);
    }
    return newName;
};

const MovieCard = ({ movie, clickedMovie, setClickedMovie }) => {
    const url = useSelector((state) => state.home.url.imageUrl);
    let movieName = movie.original_title || movie.name;
    const shortName = getName(movieName);

    return (
        <div
            onClick={() => {
                // if movie.media_type is given then set media_type else leave unchanged because its parent is already setted its media_type
                if (movie.media_type !== undefined && movie.media_type !== null)
                    setClickedMovie({
                        id: movie.id,
                        media_type: movie.media_type,
                    });
                else setClickedMovie({ ...clickedMovie, id: movie.id });
            }}
            className="border-b-2 w-[145px] lg:w-[175px] cursor-pointer shrink-0 rounded-xl shadow-xl"
        >
            <div className="relative rounded-t-xl">
                <img
                    className=" rounded-t-xl w-full "
                    src={movie?.poster_path === null ? poster_fallout_image : url + movie.poster_path}
                    alt="Movie poster"
                />
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor:
                            movie.vote_average < 5
                                ? "red"
                                : movie.vote_average < 7
                                ? "orange"
                                : "green",
                        textColor:
                            movie.vote_average < 5
                                ? "red"
                                : movie.vote_average < 7
                                ? "orange"
                                : "green",
                    })}
                    className="absolute font-bold inline bottom-1 -left-[45px] lg:-left-[60px] h-10 w-5"
                    value={movie.vote_average}
                    text={movie.vote_average}
                    maxValue={10}
                />
            </div>
            <div className="px-1">
                <p className="text-sm leading-5">
                    {shortName}
                    <span>
                        {shortName.length < movieName.length ? "..." : ""}
                    </span>
                </p>
                <p className="text-sm">{movie.release_date}</p>
            </div>
        </div>
    );
};

export default MovieCard;
