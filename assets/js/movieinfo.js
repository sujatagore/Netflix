
const singleMovie = document.getElementById("singleMovie");
const figcaption = document.querySelector(".singleMoviecontainer figcaption");

const getMovieInfo = async () =>{
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search);
    const MOVIE_ID = queryParams.get("movieid");
    const MOVIE_URL = `${BASE_URL}/movie/${MOVIE_ID}?api_key=${API_KEY}`;
    const CAST_URL = `${BASE_URL}/movie/${MOVIE_ID}/credits?api_key=${API_KEY}`;

    // let movieObj = await callAPI(MOVIE_URL, "GET");
    // let castcrewObj = await callAPI(CAST_URL, "GET");

    let arrAPI = [
        callAPI(MOVIE_URL, "GET"),
        callAPI(CAST_URL, "GET")
    ];
    let [movieObj, castcrewObj] = await Promise.all(arrAPI);

    figcaption.innerHTML = `<div>
                                <img src="https://image.tmdb.org/t/p/w342/${movieObj.production_companies[0].logo_path}" 
                                alt="${movieObj.original_title || movieObj.title || movieObj.original_name}" 
                                title="${movieObj.original_title || movieObj.title || movieObj.original_name}" 
                                class="movieLogo mb-4">
                                <h4 class="title mb-4">
                                    ${movieObj.original_title || movieObj.title || movieObj.original_name}
                                </h4>
                                <ul class="details">
                                    <li>${movieObj.release_date}</li>
                                    <li><span>${movieObj.adult ? `A` : `U/A`}</span></li>
                                    <li>${movieObj.runtime}</li>
                                    <li class=""genresList">
                                        ${movieObj.genres.map(gen =>` <span data-genCode= "${gen.id}">${gen.name}</span>`).join(", ")}
                                    </li>
                                </ul>
                                <p class="singlemovieOverview"> ${movieObj.overview}
                                </p>
                                <p class="staring">
                                    <strong> Staring : ${castcrewObj.cast.slice(0, 5).map(c => c.name || c.original_name || '').join(", ")}</strong>
                                </p>
                            </div>`;

    let bannerImg = `${IMG_URL}/original/${movieObj.backdrop_path || movieObj.poster_path}`;
    singleMovie.style.backgroundImage = `url(${bannerImg})`;
};

getMovieInfo();