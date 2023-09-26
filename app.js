const APIURL = "https://api.jikan.moe/v4/top/anime";
const SEARCHAPI = "https://api.jikan.moe/v4/anime?q=";
const searchtermlast = "&sfw";

// ye HTML WALE TAG
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

///initalyy get fav movies
getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  // movie aa gyi

  // yaha pe show karenge
  showMovies(respData.data);

}
//
function showMovies(movies) {
  console.log(movies);
  //clear main
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { synopsis, title, score, images, episodes, year ,trailer} = movie;
    // raja
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    //console.log(images.jpg.image_url);
    movieEl.innerHTML = `
    
       <img src="${images.jpg.image_url}" alt="${title}"/>

     <div class="movie-info">
         <h3>${title}</h3>
        
         <span class="${getClassByRate(score)}">${score}</span>
     </div> 

     <div class="overview">
     <div class=" head">

     <h2 > <b> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Overview:&nbsp;&nbsp;&nbsp;&nbsp; </b></h2>
     </div>

     <div class="syp">
     ${synopsis}
     </div>
     <a href='${trailer.url}' target='_blank'>View Trailer</a>
     
     </div>
     </br>
     <div class="episodes">
     Total Ep:${episodes}
     <br>
      <div class="air">
     -:${year}
     </div>
    
     </div>
     `;

    main.appendChild(movieEl)
  });

}



function getClassByRate(sc) {
  if (sc >= 9) {
    return 'green';
  } else if (sc >= 5) {
    return 'orange'
  } else {
    return 'red';
  }

}


form.addEventListener("submit", (e) => {
  e.preventDefault();


  const searchTerm = search.value;

  if (searchTerm) {

    getMovies(SEARCHAPI + searchTerm + searchtermlast);

    search.value = "";
  }

});




