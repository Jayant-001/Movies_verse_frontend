import React, { useEffect, useState } from "react";
import { getCookie } from "../cookie/cookie";
import MyMoviesList from "../components/MyMoviesList";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const MyMovies = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = () => {
        const user = getCookie();
        axios
            .get(`${process.env.REACT_APP_SERVER_URI}/api/get/${user}`)
            .then(({ data }) => {
                if (userData === null) setUserData(data);
                setLoading(false);
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
        <div className="h-fit mt-0 py-10 flex flex-wrap gap-3 justify-evenly items-center mx-5 ">
            {loading && (
                <div className="w-screen h-screen flex items-center justify-center">
                    <InfinitySpin width="200" color="#4fa94d" />
                </div>
            )}
            {!loading &&
                userData &&
                userData.movies.map((element, index) => {
                    return <MyMoviesList key={index} element={element} />;
                })}
        </div>
    );
};

export default MyMovies;
