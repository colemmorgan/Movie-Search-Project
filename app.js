let moviesUnsorted;
let search = true;
let userInput;

async function getMovies(userInput) {
  const movieAPI = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=27145482&s=${userInput}`
  );
  const moviesData = await movieAPI.json();
  const moviesList = moviesData.Search;

  return moviesList;
}

function moviesListHTML(movie) {
  return ` <div class="movie__wrapper">
    <figure class="movie__img--wrapper">
        <img src="${movie.Poster}" alt="" class="movie__img">
    </figure>
    <div class="movie__description--wrapper">
        <p class="movie__title movie__descriptor"><i class="fa-sharp fa-solid fa-ticket movie-fa"></i> Title: ${
          movie.Title
        }</p>
        <p class="movie__year movie__descriptor"><i class="fa-solid fa-calendar-days movie-fa"></i> Release Year: ${
          movie.Year
        }</p>
        <p class="movie__type movie__descriptor"><i class="fa-sharp fa-solid fa-tv movie-fa"></i> Type: ${movie.Type.charAt(
          0
        ).toUpperCase()}${movie.Type.substring(1)}</p>
    </div>
    <div class="buttons">
    <div id="wishlist-add__wrapper">
      <button class="wishlist-add click" onclick="unfinishedFeature()">
        <i class="fa-solid fa-plus"></i>
    </button>
    </div>
    <button class="enlarge-image click" onclick="unfinishedFeature()">
      <i class="fa-solid fa-image"></i>
    </button>
  </div>
</div>`;
}

async function searchMovies(filter) {
  searchBarText= document.querySelector("#search").value
  if (searchBarText !== ""){
    localStorage.setItem("userInput", searchBarText)
  }

  const userInput = localStorage.getItem("userInput")


    if (userInput===""){
      return alert("Please enter a keyword before sorting")
    }
 
  let searchHTML = document.querySelector(".search__result");
  searchHTML.innerHTML = `<h2>Search Results for "${userInput
    .charAt(0)
    .toUpperCase()}${userInput.substring(1)}" </h2>`;




    document.querySelector(".movie__list").style.display = "flex";
    document.querySelector(".no-result").style.display = "none";
    document.body.classList += ' books__loaded'
    moviesUnsorted = await getMovies(userInput);

  
  
    try {
        if (filter === "OLDEST") {
        moviesUnsorted.sort((a, b) => a.Year - b.Year);
        } else if (filter === "NEWEST") {
        moviesUnsorted.sort((a, b) => b.Year - a.Year);
        } else if (filter === "ALPHA") {
        moviesUnsorted.sort();
        }
    } catch (error) {
        alert("Cannot be sorted");
    }
  
     displayMovies(moviesUnsorted);

     
}



 function displayMovies(moviesUnsorted) {
  let moviesHTML = document.querySelector(".movie__list");
  moviesHTML.innerHTML= ""

// search for movie, if not found display error message

     setTimeout(() => {
      try { moviesHTML.innerHTML = moviesUnsorted
      .map((movie) => moviesListHTML(movie))
      .slice(0, 6)
      .join("");}
      catch(error) {
        document.querySelector(".movie__list").style.display = "none";
        document.querySelector(".no-result").style.display = "flex";
      }
      document.body.classList.remove('books__loaded')
    }, 750);
    

}

function sortMovies(event) {
 
  searchMovies(event.target.value);
 
}







async function randMovie() {
  document.getElementById("form1").reset();
  random = true
  const keywords = getRandomKeyword()
  userInput= keywords[generateRandomNumber(0,keywords.length)]
  localStorage.setItem("userInput", userInput)

  await searchMovies("");
}


function generateRandomNumber(min,max){
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandomKeyword() {
  return ['Star Wars','Cats','Cars','Jail','Avengers','Wizard','Found','Black','Men','Lost','Science','Space','America','Soccer','football','Sports','Business','College','fishing','Life','Gym','Dog','history','war','Mindset','cartoon']
}


function unfinishedFeature() {
  alert("This feature has not yet been implemented")
}