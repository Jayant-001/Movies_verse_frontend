import { useEffect } from "react";
import { fetchFromAPI } from "./api/api";
import { useDispatch } from "react-redux";
import { setApiConfig } from "./store/homeSlice";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Search from "./pages/Search";
import PageNotFound from "./pages/PageNotFound";
import Explore from "./pages/Explore";
import NavBar from "./components/NavBar";
import MyMovies from "./pages/MyMovies";
import NewUser from "./pages/NewUser";
import Auth from "./pages/Auth";

// https://developers.themoviedb.org/3/tv/get-top-rated-tv

function App() {
    const dispatch = useDispatch();

    const fetchApiConfig = async () => {
        const apiData = await fetchFromAPI("/configuration", "");

        // console.log(apiData.data)
        const url = {
            imageUrl: apiData?.data?.images.secure_base_url + "original",
            backdrop: apiData?.data?.images.secure_base_url + "original",
            poster: apiData?.data?.images.secure_base_url + "original",
            profile: apiData?.data?.images.secure_base_url + "original",
        };
        dispatch(setApiConfig(url));
    };

    useEffect(() => {
        fetchApiConfig();
    }, []);

    return (
        <BrowserRouter>
            <div className="text-slate-100 h-screen">
                <NavBar />
                <div className="h-screen mt-12">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/detail/:mediaType/:id"
                            element={<Details />}
                        />
                        <Route path="/search/:query" element={<Search />} />
                        <Route
                            path="/explore/:mediaType"
                            element={<Explore />}
                        />
                        <Route path="/myfavourite" element={<MyMovies />} />
                        <Route path="/login" element={<NewUser />} />
                        <Route path="/authenticate" element={<Auth />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
                <div className="fixed bg-slate-500 bottom-0 flex items-center justify-center w-full py-1 border-t-0 border-white">
                    <h1>
                        Designed and Developed by{" "}
                        <a href="https://www.linkedin.com/in/jayant-cse/" target="_blank"> 
                            <span className="underline cursor-pointer text-slate-300 tracking-wider">
                                JAYANT
                            </span>
                        </a>
                    </h1>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
