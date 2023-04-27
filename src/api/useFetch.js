import { useEffect, useState } from "react";
import { fetchFromAPI } from "./api";

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetchFromAPI(url).then((res) => {
            setLoading(false);
            if (res.error) {
                setError(res.error);
            } else if (res.data) {
                setData(res.data);
            }
        });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
