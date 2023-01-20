import axios from "axios";

const YOUTUBE_API_BASE_URL = 'https://youtube138.p.rapidapi.com';

export const fetchDataFromYoutubeApi = async (query) => {
    const options = {
        method: 'GET',
        url: `${YOUTUBE_API_BASE_URL}/search/`,
        params: {q: query, hl: 'en', gl: 'US'},
        headers: {
          'X-RapidAPI-Key': 'df5863f335msh98433014f724ef6p1fbbd3jsn21626690e9b5',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    const {data} = await axios.request(options);
    return data;
}

export const fetcVideoDetailsFromYoutubeApi = async (id) => {
    const options = {
        method: 'GET',
        url: `${YOUTUBE_API_BASE_URL}/video/details/`,
        params: {id: id, hl: 'en', gl: 'US'},
        headers: {
        'X-RapidAPI-Key': 'df5863f335msh98433014f724ef6p1fbbd3jsn21626690e9b5',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
      }
    };

    const {data} = await axios.request(options);
    return data;
}

export const fetcRelatedVideosFromYoutubeApi = async (id) => {
    const options = {
        method: 'GET',
        url: `${YOUTUBE_API_BASE_URL}/video/related-contents/`,
        params: {id: id, hl: 'en', gl: 'US'},
        headers: {
          'X-RapidAPI-Key': 'df5863f335msh98433014f724ef6p1fbbd3jsn21626690e9b5',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    const {data} = await axios.request(options);
    return data;
}