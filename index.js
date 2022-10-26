// let counter = 0
const jokeJod = document.getElementById('jod')
const setupJod = document.getElementById('setup')
const deliveryJod = document.getElementById('delivery')
const btn = document.getElementById('random-joke')
const anyButton = document.getElementById('any')
const miscButton = document.getElementById('misc')
const progButton = document.getElementById('programming')
const darkButton = document.getElementById('dark')
const punButton = document.getElementById('pun')
const spookyButton = document.getElementById('spooky')
const xmasButton = document.getElementById('christmas')
const catButtonArray = []
catButtonArray.push(anyButton, miscButton, punButton, spookyButton, xmasButton, darkButton, progButton)
catButtonArray.forEach( (button) => {
  buttonAddListener(button)
})
function buttonAddListener(button) {
  button.addEventListener('click', (event) => {
    catButtonHandler(event)})
}
function catButtonHandler(event) {
  console.log(event.target.textContent)
 const btncontent = event.target.textContent
 fetch(`https://v2.jokeapi.dev/joke/${btncontent}?amount=10?format=json&safe-mode`)
 .then(resp => resp.json())
 .then(jokeData =>{
   console.log(jokeData)
 })
}


// function categoryjoke(){
//   fetch(`https://v2.jokeapi.dev/joke/${category}?amount=10?format=json&safe-mode`)
//   .then(resp => resp.json())
//   .then(jokeData =>{
//     console.log(jokeData)
//   })
// }



function randomOneJoke() {
const jokeCategory = "any"
fetch(`https://v2.jokeapi.dev/joke/${jokeCategory}?amount=1?format=json&safe-mode`)
  .then(resp => resp.json())
  .then(jokeData => {
    //console.log(jokeData);
    // console.log(jokeData.jokes)
     //renderJokeButtons(jokeData)
    // renderJod(jokeData.jokes)
    determineJokeType(jokeData)
  })
}

btn.addEventListener('click', (e) => {
  // console.log(e)
  // if (counter < 10) {
  //   counter++
  //   // console.log(counter) 
  // } else {
  //   counter = 0
    randomOneJoke()

  //   console.log(counter)
  //   return counter
  })

//If joke is two part return set/delivery. if joke is onepart return joke body

// function jokesLoop(jokeArray) {
//     for(joke of jokeArray) {
//       determineJokeType(joke)}}
      //console.log(joke);

function renderTwoPart(joke) {
    
    setupJod.innerHTML = ''
    deliveryJod.innerHTML = ''
    jokeJod.textContent = ''
    setupJod.textContent = `${joke.setup}`
    deliveryJod.textContent = `${joke.delivery}`
}

function renderOnePart(joke){
  
  jokeJod.textContent = ''
  setupJod.innerHTML = ''
  deliveryJod.innerHTML = ''
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

randomOneJoke()

// random joke button 

// const randomJoke = () => {
//     fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
//     .then(resp => resp.json())
//     .then(joke =>
//       displayJoke())
// }

// display Joke



