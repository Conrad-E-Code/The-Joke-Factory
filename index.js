function randomJokeFetch() {
const jokeCategory = "christmas"
fetch(`https://v2.jokeapi.dev/joke/${jokeCategory}?amount=10?format=json`)
.then(resp => resp.json())
.then(jokeData => {
  // console.log(jokeData);
  console.log(jokeData.jokes)
  // renderJokeButtons(jokeData)
  // renderJod(jokeData.jokes)
  determineJokeType(jokeData.jokes[0])
})
}

//If joke is two part return set/delivery. if joke is onepart return joke body

/* <h2 id="setup"></h2>
<p id="delivery"></p>
<h2 id="jod"></h2>
<p id="joke-category"></p> */

function jokesLoop(jokeArray) {
    for(joke of jokeArray) {
      determineJokeType(joke)}}
      //console.log(joke);

function renderTwoPart(joke) {
    const setupJod = document.getElementById('setup')
    const deliveryJod = document.getElementById('delivery')
    setupJod.textContent = `${joke.setup}`
    deliveryJod.textContent = `${joke.delivery}`
}

function renderOnePart(joke){
  const jokeJod = document.getElementById('jod')
  jokeJod.textContent = `${joke.joke}`
}

function determineJokeType(joke) {
  if (joke.type === "twopart") {
    renderTwoPart(joke)
    // console.log(`SETUP ${joke.setup}, DELIVERY ${joke.delivery}`)
  } else {
    renderOnePart(joke)
    // console.log(`JOKE ${joke.joke}`)
}}

  //render joke buttons.

function renderJokeButtons(jokeData) {
    const catButtonList = document.createElement("ul")  //creating html list
    const buttonDiv = document.getElementById("joke-categories-menu")
    buttonDiv.append(catButtonList)
    jokeData.jokes.forEach((joke) => {
      const jokeButton = document.createElement("button")
      jokeButton.textContent = joke.category
      catButtonList.append(jokeButton)
    })
}

randomJokeFetch()

// random joke button 

// const randomJoke = () => {
//     fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
//     .then(resp => resp.json())
//     .then(joke =>
//       displayJoke())
// }

// display Joke


