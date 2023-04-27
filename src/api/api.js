import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.REACT_APP_API_TOKEN;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
    'Content-Type': 'application/json',
};

export const fetchFromAPI = async (url, params) => {
    const response = {data: null, error: null}
    try {
        const { data } = await axios.get(BASE_URL + url, { headers, params });
        response.data = data;
    } catch (err) {
        
        response.error = err;
    }
    return {data: response.data, error: response.error}
};
