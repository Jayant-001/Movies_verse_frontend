import React, { useEffect, useState } from "react";
import { getCookie } from "../cookie/cookie";
import MyMoviesList from "../components/MyMoviesList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyMovies = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    console.log(process.env.REACT_APP_SERVER_URI)

    const fetchUserData = () => {
        const user = getCookie();
        axios
            .get(`${process.env.REACT_APP_SERVER_URI}/api/get/${user}`)
            .then(({ data }) => {
                if (userData === null) setUserData(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const user = getCookie();
        if (user === undefined) {
            // window.history.;
            navigate("/login");
        } else {
            fetchUserData();
        }
    }, []);

    return (
        <div className="h-fit mt-0 py-5 flex flex-wrap gap-3 justify-evenly items-center mx-5 ">
            {userData &&
                userData.movies.map((element, index) => {
                    return <MyMoviesList key={index} element={element} />;
                })}
        </div>
    );
};

export default MyMovies;
