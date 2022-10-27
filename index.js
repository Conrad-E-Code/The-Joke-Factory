let counter = 0
// jokeJod is selecting the element we want the body of a single part joke of the day to be rendered on the page.
const jokeJod = document.getElementById('jod')

//setup JOD is the page element where the setup of a two part joke is rendered
const setupJod = document.getElementById('setup')

//deliveryJOD is the page element where the delivery of a two part joke is rendered
const deliveryJod = document.getElementById('delivery')

// jokeByCategory is the page element div that holds the  h3 , p, that either a two part or one part joke is rendered into
const jokebyCategory = document.getElementById('joke-by-category')

//set-up cat is an h3 where the setup of a two part joke by category is rendered.
const setupCat = document.getElementById('setup-cat')

//delivery cat is a p where the delivery is rendered. Two part joke
const deliveryCat = document.getElementById('delivery-cat')

//singleCat is a h3 where a single part joke is rendered by Category
const singleCat = document.getElementById('cat-joke')

//btn is the get a random joke button
const btn = document.getElementById('random-joke')

//these are all of the buttons for the categories.
const anyButton = document.getElementById('any')
const miscButton = document.getElementById('misc')
const progButton = document.getElementById('programming')
const darkButton = document.getElementById('dark')
const punButton = document.getElementById('pun')
const spookyButton = document.getElementById('spooky')
const xmasButton = document.getElementById('christmas')

// putting the buttons into an array
const catButtonArray = []
catButtonArray.push(anyButton, miscButton, punButton, spookyButton, xmasButton, darkButton, progButton)

//Looping over that array of buttons and adding event listener to each one.
catButtonArray.forEach( (button) => {
  buttonAddListener(button)
})
function buttonAddListener(button) {
  button.addEventListener('click', (buttonEvent) => {
    catButtonHandler(buttonEvent)})
}

//event handler for the category buttons, fetches 10 jokes by category has two callback functions:
// scrollThruJoke and determineJokeTypeCat()

function catButtonHandler(buttonEvent) {
  // console.log(event.target.textContent)
 const btncontent = buttonEvent.target.textContent
 fetch(`https://v2.jokeapi.dev/joke/${btncontent}?amount=10?format=json&safe-mode`)
 .then(resp => resp.json())
 .then(jokeData =>{
  // console.log(jokeData.jokes[0])
  // function still works when console logging
  // console.log(determineJokeTypeCat(jokeData.jokes[0]))
  scrollThruJoke(jokeData, buttonEvent) 
  determineJokeTypeCat(jokeData.jokes[counter]) 
 })
}

//scrollThruJoke is a callback function for catButtonHandler that accept jokeData and Buttonevents, to carry the jokedata 
function scrollThruJoke(jokeData, buttonEvent){
 document.addEventListener('keydown', (keyEvent)=> {
    scrollHandler(jokeData, keyEvent, buttonEvent)
  })
}

function scrollHandler(jokeData, keyEvent, buttonEvent){

  if (keyEvent.key =="ArrowRight"){
    console.log(keyEvent)
    if(counter < 9){
      counter++;
      console.log(`${counter} IM GOING FORWARDS`)
      console.log(jokeData.jokes[counter])
      determineJokeTypeCat(jokeData.jokes[counter]);
    } else  {
      // console.log(counter)
      counter = 0
      // console.log(counter)
      jokeMaxHandler(keyEvent, buttonEvent)
    }
  } else if (keyEvent.key =="ArrowLeft"){
    if(counter > 0){
      console.log(`${counter} Im going backwards`)
      determineJokeTypeCat(jokeData.jokes[counter])
      counter--;
    } else if(counter < 0) {
      console.log("left key was pressed below 0")
    }
}}

function determineJokeTypeCat(joke) {
  if (joke.type === "twopart") {
    renderTwoPartCat(joke)
    // console.log(`SETUP ${joke.setup}, DELIVERY ${joke.delivery}`)
  } else {
    renderOnePartCat(joke)
    // console.log(`JOKE ${joke.joke}`)

    
}}


function renderTwoPartCat(joke) {
  setupCat.innerHTML = ''
  deliveryCat.innerHTML = ''
  singleCat.textContent = ''
  setupCat.textContent = `${joke.setup}`
  deliveryCat.textContent = `${joke.delivery}`

}

function renderOnePartCat(joke){
singleCat.textContent = ''
setupCat.innerHTML = ''
deliveryCat.innerHTML = ''
singleCat.textContent = `${joke.joke}`
}



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
                                                  // buttun event listener below.
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
    
   renderOnePartBtn()
   renderTwoPartBtn()
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
const submitForm = document.getElementById("submit-a-joke-card")

/*const jokeType = document.getElementById("part-quantity-input")
console.log(jokeType)
console.log(submitForm)
const onePartButton = document.createElement("button")
const twoPartButton = document.createElement("button")
//onePartButton.textContent = "One Part Joke"
twoPartButton.textContent = "Two Part Joke"
submitForm.appendChild(onePartButton, twoPartButton)*/

function renderSelectButtons() {
  /*const onePartBtn = document.createElement("button")
  const twoPartBtn = document.createElement("button")
 // console.log(submitForm)
 // console.log(onePartBtn)
 // console.log(twoPartBtn)
 onePartBtn.textContent = "One Part Joke"
 twoPartBtn.textContent = "Two Part Joke"
 onePartBtn.type = "button"
 twoPartBtn.type = "button"
 onePartBtn.addEventListener("click", (event) => {onePartBtnClick(event)})
 twoPartBtn.addEventListener("click", (event) => {twoPartBtnClick(event)})
 submitForm.append(onePartBtn, twoPartBtn)
 */
renderOnePartBtn()
renderTwoPartBtn()
}
renderSelectButtons()
function onePartBtnClick(event)                                               // one part create a joke click
{
console.log("clicked one-part")
event.target.parentNode.innerHTML =""
const jokeInput = document.createElement("Input")
jokeInput.type = "text"
jokeInput.placeholder = "Enter Joke Content Here"
jokeInput.id = "joke-input"
jokeInput.setAttribute("required", "")
submitForm.append(jokeInput)
renderSubmitButton()
renderTwoPartBtn()
createCategoryList()
submitOnePartListener()
}

function twoPartBtnClick(event) {                                          // "two part button click"

console.log("clicked two part")
event.target.parentNode.innerHTML =""

const setupInput = document.createElement("input")
const deliveryInput = document.createElement("input")

setupInput.type = "text"
deliveryInput.type = "text"

setupInput.placeholder = "Input Setup Here"
deliveryInput.placeholder = " Input Delivery here"

setupInput.id = "setup-input"
deliveryInput.id = "delivery-input"
setupInput.setAttribute("required", "")
deliveryInput.setAttribute("required", "")

submitForm.append(setupInput, deliveryInput)
renderSubmitButton()
renderOnePartBtn()
createCategoryList()
submitTwoPartListener()
}
function renderSubmitButton() {
  const submitButton = document.createElement("button")
  submitButton.id = "submit-button"
  submitButton.type = "submit"
  submitButton.textContent = "Submit a Joke"
  submitForm.append(submitButton)
 // renderOnePartBtn()
  }

function renderOnePartBtn() {
  const onePartBtn = document.createElement("button")
  onePartBtn.textContent = "One Part Joke Form"
  onePartBtn.type = "button"
  onePartBtn.id = "one-part-button"
  submitForm.appendChild(onePartBtn)
  onePartBtn.addEventListener("click", (event) => {onePartBtnClick(event)})
}

function renderTwoPartBtn() {
  const twoPartBtn = document.createElement("button")
  twoPartBtn.type = "button"
  twoPartBtn.textContent = "Two Part Joke Form"
  twoPartBtn.id = "two-part-button"
  twoPartBtn.addEventListener("click", (event) => {twoPartBtnClick(event)})
  submitForm.appendChild(twoPartBtn)
}


function jokeMaxHandler(keyEvent, buttonEvent){
  const btncontent = buttonEvent.target.textContent
  fetch(`https://v2.jokeapi.dev/joke/${btncontent}?amount=10?format=json&safe-mode`)
  .then(resp => resp.json())
  .then(jokeData =>{
   // console.log(jokeData.jokes[0])
   // function still works when console logging
   // console.log(determineJokeTypeCat(jokeData.jokes[0]))
  //  determineJokeTypeCat(jokeData.jokes[counter]) 
  //  scrollThruJoke(jokeData) 
  scrollHandler(jokeData, keyEvent, buttonEvent)
  })
}

function createCategoryList() {
  createCheckBox("Any")
  createCheckBox("Christmas")
  createCheckBox("Spooky")
  createCheckBox("Pun")
  createCheckBox("Programming")
  createCheckBox("Misc")
  createCheckBox("Dark")
}

function createCheckBox(checkBoxContent) {

const checkBox = document.createElement("input")
checkBox.class = "form-control"
checkBox.type = "radio"
checkBox.name = `category-checkbox`
checkBox.value = `${checkBoxContent}`
checkBox.id = `${checkBoxContent}-input`
//checkBox.label = `${checkBoxContent}`
//checkBox.value = `${checkBoxContent}`
const checkBoxLabel = document.createElement("label")
checkBoxLabel.textContent = `${checkBoxContent}`
submitForm.prepend(checkBoxLabel)
checkBoxLabel.append(checkBox)
//console.log(submitForm)
//console.log(checkBoxLabel)
}

/*
<label class="form-control">
  <input type="checkbox" name="checkbox" />
  Checkbox
</label>

<label class="form-control">
  <input type="checkbox" name="checkbox-checked" checked />
  Checkbox - checked
</label>
*/

// submitForm.addEventListener("submit", (e) => {
//   e.preventDefault() 
//   console.log(e.target."setup-input")})                                                       R & D FOR capturing form data in an object


// // create new joke object
// const newOnePartJoke = {}

// const newTwoPartJoke = {}
// //    NEED TO GET DATA FROM FORM AND ASSIGN HERE for one part joke

// newOnePartJoke.joke = "something from the form (formInputElement.value)"
// //    NEED TO GET DATA FROM FORM AND ASSIGN HERE for two part joke
// newTwoPartJoke.setup = "something from the setup input (setupinput.value?)"
// newTwoPartJoke.delivery = "something ditto from form (deliveryInput.value) "

// //  Input ffrom form elements two part of one part joke. 



function submitOnePartListener() {
  let submitOnePartForm = document.getElementById("submit-a-joke-card")
  
submitOnePartForm.addEventListener("submit", (submitEvent) => {
  submitEvent.preventDefault()
  console.log(`${submitEvent} <--- CL submitEventOne`)
  console.log(`${submitEvent.target["joke-input"]["value"]} <---- CONSOLE LOG EVENT target joke-input value`)
  //console.log(`${submitEvent.target["setup-input"]["value"]}  <--- console log setup-input value`)
  //console.log(`${submitEvent.target["delivery-input"]["value"]}  <--- console log delivery-input value`)

  //newOPJoke.joke = submitEvent.target["joke-input"]
  //console.log(jokeInput.innerHTML())
  const newOPJoke = {
    "category": "empty-category",
    "type": "single",
    "joke": submitEvent.target["joke-input"]["value"]
                    }

  radioButtons(newOPJoke)
  console.log(`${newOPJoke["joke"]} I'm the joke called by key in an object`)
  console.log(`${newOPJoke["category"]} I'm the category of the single joke called by key in an object`)
}
)
//fetchnewJoke(newOPJoke)
}

function submitTwoPartListener() {
  let submitTwoPartForm = document.getElementById("submit-a-joke-card")
submitTwoPartForm.addEventListener("submit", (submitEvent) => {
  submitEvent.preventDefault()
  console.log(`${submitEvent} <--- CL submitEventOne`)
  //console.log(`${submitEvent.target["joke-input"]["value"]} <---- CONSOLE LOG EVENT target joke-input value`)
  console.log(`${submitEvent.target["setup-input"].value}  <--- console log setup-input value`)
  console.log(`${submitEvent.target["delivery-input"].value}  <--- console log delivery-input value`)
  const newTPJoke = {
    "category": "empty-category", 
    "type": "twopart",
    "setup": submitEvent.target["setup-input"].value,
    "delivery" : submitEvent.target["delivery-input"].value
    submitFormPost()
  }
  radioButtons(newTPJoke)
  console.log(`${newTPJoke.setup} I'm the setup called by key and object`)
  console.log(`${newTPJoke.delivery} I'm the delivery called by key and object`)
  console.log(`${newTPJoke.category} I'm the category called by key and object`)
})
}

function radioButtons(newJoke) {
const radios = document.getElementsByName("category-checkbox")
for (radio of radios) {
  if (radio.checked) {
    newJoke.category = `${radio.value}`
  }
}
}


function submitFormPOST(newJoke) {

fetch("submiturl", 
{
 method: 'POST',
  headers: { 
    'Content-Type': 'application/json'
  },
  body: json.stringify(newJoke)
})
.then(resp => resp.json())
.then((newJoke) => console.log(newJoke))
}