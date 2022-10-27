function init() {
  let counter = 0
  
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
  // scroll handler is a callback function of scrollthru joke data
  
  
                                                                                // joke rendering by category 
  function scrollHandler(jokeData, keyEvent, buttonEvent){
  
    if (keyEvent.key =="ArrowRight"){
      console.log(keyEvent)
      if(counter < 9){
        counter++;
        console.log(`${counter} IM GOING FORWARDS`)
        console.log(jokeData.jokes[counter])
        determineJokeTypeCat(jokeData.jokes[counter]);
      } else  {
        counter = 0
        jokeMaxHandler(keyEvent, buttonEvent) 
      }
    } else if (keyEvent.key =="ArrowLeft"){
      if(counter > 0){
        counter--;
        console.log(`${counter} Im going backwards`)
        determineJokeTypeCat(jokeData.jokes[counter])
        //counter--;
      } else if(counter < 0) {
        console.log("left key was pressed below 0")
      }
  }}
  
  function jokeMaxHandler(keyEvent, buttonEvent){
    const btncontent = buttonEvent.target.textContent
    fetch(`https://v2.jokeapi.dev/joke/${btncontent}?amount=10?format=json&safe-mode`)
    .then(resp => resp.json())
    .then(jokeData =>{
  
  
    scrollHandler(jokeData, keyEvent, buttonEvent)
    })
  }
  
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
      determineJokeType(jokeData)
    })
  }
  btn.addEventListener('click', (e) => {
      randomOneJoke()
    })
  const jokeJod = document.getElementById('jod')
  const setupJod = document.getElementById('setup')
  
  //deliveryJOD is the page element where the delivery of a two part joke is rendered
  const deliveryJod = document.getElementById('delivery')
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
    } else {
      renderOnePart(joke)
  }}
  
  randomOneJoke()
  
  const submitForm = document.getElementById("submit-a-joke-card")
  
  
  function renderSelectButtons() {
  
  renderOnePartBtn()
  renderTwoPartBtn()
  }
  renderSelectButtons()
  
  function onePartBtnClickHandler(event)                                               // one part create a joke click
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
  
  function twoPartBtnClickHandler(event) {                                          // "two part button click"
  
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
    }
  function renderOnePartBtn() {
    const onePartBtn = document.createElement("button")
    onePartBtn.textContent = "One Part Joke Form"
    onePartBtn.type = "button"
    onePartBtn.id = "one-part-button"
    submitForm.appendChild(onePartBtn)
    onePartBtn.addEventListener("click", (event) => {onePartBtnClickHandler(event)})
  }
  
  function renderTwoPartBtn() {
    const twoPartBtn = document.createElement("button")
    twoPartBtn.type = "button"
    twoPartBtn.textContent = "Two Part Joke Form"
    twoPartBtn.id = "two-part-button"
    twoPartBtn.addEventListener("click", (event) => {twoPartBtnClickHandler(event)})
    submitForm.appendChild(twoPartBtn)
  }
  
  function createCategoryList() {
    const categoryCheckBoxArray =["Any", "Christmas", "Spooky", "Pun", "Programming", "Misc", "Dark"]
    categoryCheckBoxArray.forEach((element) => {
      createCheckBox(element)
    })
  }
  
  function createCheckBox(checkBoxContent) {
  
  const checkBox = document.createElement("input")
  //const radioButtons = document.getElementById("submit-joke-radio")
  
  checkBox.class = "form-control"
  checkBox.type = "radio"
  checkBox.name = `category-checkbox`
  checkBox.value = `${checkBoxContent}`
  checkBox.id = `${checkBoxContent}-input`
  checkBox.setAttribute("required", "")
  const checkBoxLabel = document.createElement("label")
  checkBoxLabel.textContent = `${checkBoxContent}`
  submitForm.prepend(checkBoxLabel)
  checkBoxLabel.append(checkBox)
  }
  function submitOnePartListener() {
    let submitOnePartForm = document.getElementById("submit-a-joke-card")
    submitOnePartForm.removeEventListener("submit", twoPartBtnClickHandler)
  submitOnePartForm.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault()
    console.log(`${submitEvent} <--- CL submitEventOne`)
  
    const newOPJoke = {
      "category": "empty-category",
      "type": "single",
      "joke": submitEvent.target["joke-input"]["value"]
      }
      radioButtons(newOPJoke)
     // console.log(`${newOPJoke["joke"]} I'm the joke called by key in an object`)                           SUBMIT EVENT CONSOLE LOGS FOR PRESENTATION
      //console.log(`${newOPJoke["category"]} I'm the category of the single joke called by key in an object`)
      submitFormPost(newOPJoke)
     // console.log("submitOnePartListener Triggered")
    })
  }
  
  function submitTwoPartListener() {
    let submitTwoPartForm = document.getElementById("submit-a-joke-card")
    submitTwoPartForm.removeEventListener("submit", onePartBtnClickHandler)
    submitTwoPartForm.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault()
    //console.log(`${submitEvent} <--- CL submitEventOne`)                                                SUBMIT EVENT CONSOLE LOGS FOR PRESENTATION
    //console.log(`${submitEvent.target["setup-input"].value}  <--- console log setup-input value`)
    //console.log(`${submitEvent.target["delivery-input"].value}  <--- console log delivery-input value`)
    const newTPJoke = {
      "category": "empty-category", 
      "type": "twopart",
      "setup": submitEvent.target["setup-input"].value,
      "delivery" : submitEvent.target["delivery-input"].value
    }
    radioButtons(newTPJoke)
    console.log(`${newTPJoke.setup} I'm the setup called by key and object`)
    console.log(`${newTPJoke.delivery} I'm the delivery called by key and object`)
    console.log(`${newTPJoke.category} I'm the category called by key and object`)
    submitFormPost(newTPJoke)
    console.log("submitTwoPartListener Triggered")
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
  
  
  function submitFormPost(newJoke) {
  fetch("https://v2.jokeapi.dev/submit?dry-run", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJoke)
  })
  .then(resp => resp.json())
  .then((newJokeResp) => console.log(newJokeResp))
  }
  }
  init()