function randomJokeFetch() {
const jokeCategory = "christmas"
fetch(`https://v2.jokeapi.dev/joke/${jokeCategory}?amount=10?format=json`)
.then(resp => resp.json())
.then(jokeData => {
  //console.log(jokeData);
  console.log(jokeData.jokes)
  renderJokeButtons(jokeData)
//getJokes(jokeData.jokes)
}
  )
}
  //If joke is two part return set/delivery. if joke is onepart return joke body
  function getJokes(jokeArray) {
    for(joke of jokeArray) {
      //console.log(joke);
      if (joke.type === "twopart") {
        console.log(`SETUP ${joke.setup} DELIVERY ${joke.delivery}`)
      }
      else {console.log(`JOKE ${joke.joke}`)}
  }}
  randomJokeFetch()


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