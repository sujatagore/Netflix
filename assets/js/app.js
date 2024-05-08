let cl = console.log;


const trendingMovies = document.getElementById("trendingMovies");
const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `58dad1cb0c036bf4185652097c6dda42`;
const IMG_URL = `https://image.tmdb.org/t/p`;
const TRENDING_URL = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;

const slider = () =>{
    $('#trendingMovies').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    
}

const mainMoviesTemplating = (arrofMovies) =>{
    trendingMovies.innerHTML = arrofMovies.map(movie =>{
        return `<div class="item">
                    <figure class="movieCard mb-0">
                        <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}" alt="">
                        <figcaption>
                            <h3 class="display-3">
                                ${movie.original_title || movie.title || movie.original_name}
                            </h3>
                            <em class="my-5">
                                ${movie.overview}
                            </em>
                            <p>
                                <button class="btn btn-large hvr-radial-out" 
                                data-id="${movie.id}" onclick="loadQparams(this)">View More</button>
                            </p>
                        </figcaption>
                    </figure>
                </div>`
    }).join("");
}

const loadQparams = (ele) =>{
    //let id = ele.getAttribute("data-id");
    let id = ele.dataset['id'];
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.searchParams);
    queryParams.set("movieid", id);
    currentUrl.search = queryParams.toString();
    let movieRedirectUrl = `${currentUrl.origin}/movieinfo.html${currentUrl.search}`;
    window.location.href = movieRedirectUrl;
}

const callAPI = async (apiUrl, methodName, msgBody) =>{
    msgBody = msgBody ? JSON.stringify(msgBody) : null;
    let res = await fetch(apiUrl, {
        method : methodName,
        body : msgBody,

    });

    return res.json();
}

const getData = async() =>{
    let res = await callAPI(TRENDING_URL, "GET")
    mainMoviesTemplating(res.results);
    slider();
}

getData();