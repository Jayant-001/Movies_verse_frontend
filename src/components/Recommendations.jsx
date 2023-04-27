import React from "react";
import useFetch from "../api/useFetch";
import Carousel from "./Carousel";

const Recommendations = ({ media_type, media_id }) => {
    const { data, loading } = useFetch(
        `/${media_type}/${media_id}/recommendations`
    );

    return (
        <div className="flex flex-col space-y-4">
            <h1>Recommendataions</h1>
            {data?.results.length > 0 ? (
                <Carousel
                    movies={data?.results}
                    loading={loading}
                    type={media_type}
                />
            ) : (
                <h1>No recommendations</h1>
            )}
        </div>
    );
};

export default Recommendations;

// /tv/{tv_id}/recommendations
// /movie/{movie_id}/recommendations
