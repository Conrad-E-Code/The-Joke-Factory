function randomJokeFetch() {
const jokeCategory = "pun"
fetch(`https://v2.jokeapi.dev/joke/${jokeCategory}?amount=10?format=json`)
.then(resp => resp.json())
.then(jokeData => {
  //console.log(jokeData);
  console.log(jokeData.jokes)
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

  function Button() {
    const anyButton = document.getElementById("any")
    const miscButton = document.getElementById("misc")
    const progButton = document.getElementById("programming")
    const darkButton = document.getElementById("dark")
    const punButton = document.getElementById("pun")
    const spookyButton = document.getElementById("spooky")
    const xmasButton = document.getElementById("Christmas")
    const buttonArray = [anyButton, miscButton, darkButton, punButton, spookyButton, xmasButton, progButton]
function addButtonClick(array) {
}