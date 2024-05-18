

const cl = console.log;



const callAPI = async (apiUrl, methodName, msgBody) =>{
    msgBody = msgBody ? JSON.stringify(msgBody) : null;
    let res = await fetch(apiUrl, {
        method : methodName,
        body : msgBody,

    });

    return res.json();
};


const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `58dad1cb0c036bf4185652097c6dda42`;
const IMG_URL = `https://image.tmdb.org/t/p`;
const TRENDING_URL = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;
