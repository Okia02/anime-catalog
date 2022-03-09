"use strict";

const inputSearch = document.querySelector(".js-input-search");
const submitBtn = document.querySelector(".js-submit-btn");
const resetBtn = document.querySelector(".js-reset-btn");
const searchResults = document.querySelector(".js-result-list");
const resetBtnFav = document.querySelector(".js-reset-btn-fav");
const favResults = document.querySelector(".js-fav-list");

let animes = [];
let favAnimes = [];

"use strict";

function getUserInput(ev) {
  ev.preventDefault();
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((animesData) => {
      animes = animesData.results;
      renderResults();
    });
}

function handlerResetBtnFav(ev) {
  ev.preventDefault();
  favResults.innerHTML = "";
  localStorage.clear();
  location.reload();
}

function handlerResetBtn(ev) {
  ev.preventDefault();
  location.reload();
}

submitBtn.addEventListener("click", getUserInput);

resetBtn.addEventListener("click", handlerResetBtn);

resetBtnFav.addEventListener("click", handlerResetBtnFav);



"use strict";

function renderResults() {
  searchResults.innerHTML = "";
  for (const anime of animes) {
    const animeInFav = favAnimes.find(
      (fav) =>
        fav.mal_id === anime.mal_id
    );
    let favAdd = "";
    animeInFav !== undefined
      ? (favAdd = "fav")
      : (favAdd = "");
    let airingAnime =
      anime.airing === true
        ? `<a class='js-airing' href='${anime.url}'>More details</a>`
        : `<p class='js-not-airing'>Not airing</p>`;
    searchResults.innerHTML += `<li class='li-element js-li-element ${favAdd}' id='${
      anime.mal_id
    }'><img class='anime-img' src='${
      anime.image_url ||
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
    }'><h3 class='anime-title'>${
      anime.title
    }</h3><div>${airingAnime}</div></li>`;
  }
  handlerClickedAnime();
}

function renderFavResults() {
  favResults.innerHTML = "";
  for (
    let i = 0;
    i < favAnimes.length;
    i++
  ) {
    const favAnime = favAnimes[i];
    favResults.innerHTML += `<li class='li-element js-li-element' id='${
      favAnime.mal_id
    }'><img class='anime-img' src='${
      favAnime.image_url ||
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
    }'><h3 class='anime-title'>${
      favAnime.title
    }</h3><i class="fas fa-times"></i></li>`;
  }
  handlerClickedAnime();
}

"use strict";

function handlerClickedFav(ev) {
  ev.preventDefault();  
  const clickedAnime = parseInt(ev.currentTarget.id);
  const favClicked = favAnimes.findIndex((fav) => {    
    return fav.mal_id === clickedAnime;
  });
  if (favClicked === -1) {
    const animeAdd = animes.find((animeElement) => {
      return animeElement.mal_id === clickedAnime;
    }); 
    favAnimes.push(animeAdd);
  } else {
    favAnimes.splice(favClicked, 1);
    console.log(favAnimes[favClicked].title);
  }
  renderResults();
  renderFavResults();
  setInLocalStorage();
}

function handlerClickedAnime() {
  const animesListened = document.querySelectorAll(".js-li-element");
  for (const animeListened of animesListened) {
    animeListened.addEventListener("click", handlerClickedFav);
  }
}

"use strict";

function setInLocalStorage() {
  const toString = JSON.stringify(favAnimes);
  localStorage.setItem("anime", toString);
}

function getInLocalStorage() {
  const localStorageFavAnimes = localStorage.getItem("anime");
  favAnimes = JSON.parse(localStorageFavAnimes);
  if (favAnimes === null) {
    favAnimes = [];
  } else {
    renderFavResults();
  }
}
getInLocalStorage();

//# sourceMappingURL=main.js.map
