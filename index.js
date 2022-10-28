function init() {

  const setupCat = document.getElementById('setup-cat')
  //delivery cat is a p where the delivery is rendered. Two part joke

  const deliveryCat = document.getElementById('delivery-cat')

  //singleCat is a h3 where a single part joke is rendered by Category
  const singleCat = document.getElementById('cat-joke')


  function catButtonLooper() {
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

    darkButton.addEventListener("click", () => {
    alert("SAFE MODE ENABLED, DARK JOKES UNAVAILABLE")
  })
    console.log("catButtonLooper() invoked: No Arguments: sets variables for buttons and adds them to catButtonArray, loops through every button in catButtonArray and invokes buttonAddListener(button)")
}


    console.log("catButtonLooper() invoked: No Arguments: sets variables for buttons and adds them to catButtonArray, loops through every button in catButtonArray and invokes buttonAddListener(button)")
  }


  function buttonAddListener(button) {
    button.addEventListener('click', (buttonEvent) => {
      catButtonHandler(buttonEvent)
    })
      console.log("buttonAddListener(button) invoked: takes button adds click listener, passes click event to catButtonHandler")
  }


  let counter = 0 


  function catButtonHandler(buttonEvent) {
    //event handler for the category buttons, fetches 10 jokes by category invokes two functions:
    // scrollThruJoke and determineJokeTypeCat()
    // console.log(event.target.textContent)
   const btncontent = buttonEvent.target.textContent
   fetch(`https://v2.jokeapi.dev/joke/${btncontent}?amount=10?format=json&safe-mode`)
    .then(resp => resp.json())
    .then(jokeData =>{
    
      scrollThruJoke(jokeData, buttonEvent) 
      determineJokeTypeCat(jokeData.jokes[counter]) 
    })
    console.log("catButtonHandler Invoked: takes jokeData, and buttonEvent as argument: fetches 10 jokes with buttonvalue as category, invokes scrollThruJoke(jokeData, buttonEvent) invokes determineJokeTypeCat(jokeArray[counter])")
  }


  //scrollThruJoke is a function for catButtonHandler that accept jokeData and Buttonevents, to carry the jokedata 
  function scrollThruJoke(jokeData, buttonEvent) {
    document.addEventListener('keydown', (keyEvent)=> {
      scrollHandler(jokeData, keyEvent, buttonEvent)
    })
    console.log("scrollThruJoke invoked: takes jokeData (array) and buttonEvent as arguments. adds keydown event listener to whole page, invokes scrollHandler passing down jokeData, buttonEvent, and keyEvent")
  }


  function scrollHandler(jokeData, keyEvent, buttonEvent) {
    // scroll handler is invoked inside of scrollthru joke data^^
    // joke rendering by category 
    if (keyEvent.key =="ArrowRight"){
      console.log(keyEvent)
      if(counter < 9){
        counter++;
        console.log(`${counter} IM GOING FORWARDS`)
        // console.log(jokeData.jokes[counter])                                              // SHOW THE SLIDE
        determineJokeTypeCat(jokeData.jokes[counter]);
      } else {
        counter = 0
        jokeMaxHandler(keyEvent, buttonEvent) 
        }
    } else if (keyEvent.key =="ArrowLeft"){                                                 // THE SLIDE!!!
      if(counter > 0){
        counter--;
        console.log(`${counter} Im going backwards`)
        determineJokeTypeCat(jokeData.jokes[counter])
        //counter--;
      } else if(counter < 0) {
        console.log("left key was pressed below 0")
        }
      }
  }


  function jokeMaxHandler(keyEvent, buttonEvent) {
    const btncontent = buttonEvent.target.textContent
    fetch(`https://v2.jokeapi.dev/joke/${btncontent}?amount=10?format=json&safe-mode`)
      .then(resp => resp.json())
      .then(jokeData =>{

      scrollHandler(jokeData, keyEvent, buttonEvent)
    })
    console.log("jokeMaxHandler invoked: takes keyEvent and buttonEvent as arguments: fetches 10 jokes using buttonevent.target.textContent as category in fetch URL, invokes scrollHandler, passes new jokeData (10 Jokes array) keyEvent and Button Event to scrollHandler.")
  }


  function determineJokeTypeCat(joke) {
    if (joke.type === "twopart") {
      renderTwoPartCat(joke)
      // console.log(`SETUP ${joke.setup}, DELIVERY ${joke.delivery}`)
    } else {
      renderOnePartCat(joke)
      // console.log(`JOKE ${joke.joke}`)  
    }
    console.log("determineJokeTypeCat(joke) invoked: Takes joke object as argument: If (joke.type === twopart) invokes renderTwoPartCat, else invokes renderOnePartCat")
  }


  function renderTwoPartCat(joke) {
    setupCat.innerHTML = ''
    deliveryCat.innerHTML = ''
    singleCat.textContent = ''
    setupCat.textContent = `${joke.setup}`
    deliveryCat.textContent = `${joke.delivery}`
    console.log("renderTwoPartCat(joke) invoked: Takes joke object as argument: blanks out innerHTML of Joke By Category display elements. and displays setup/delivery value in Joke by Category") 
  }
  

  function renderOnePartCat(joke) {
    singleCat.textContent = ''
    setupCat.innerHTML = ''
    deliveryCat.innerHTML = ''
    singleCat.textContent = `${joke.joke}`
    console.log("renderOnePartCat(joke) invoked: Takes joke object as argument: blanks out innerHTML of Joke By Category display elements. and displays joke value in Joke by Category")  
  }


  function randomOneJoke() {
    const jokeCategory = "any"
    fetch(`https://v2.jokeapi.dev/joke/${jokeCategory}?amount=1?format=json&safe-mode`)
      .then(resp => resp.json())
      .then(jokeData => {
        determineJokeType(jokeData)
      })
    console.log("randomOneJoke() invoked: N.A.: fetches one joke from any category and invokes determineJokeType")
  }


  function btnAddListener() {
    //btn is the get a random joke button
    const btn = document.getElementById('random-joke')
    btn.addEventListener('click', (e) => {
      randomOneJoke()
    })
    console.log("btnAddListener invoked: N.A.: adds click listener to get a random joke button and sets randomOneJoke as the handler.")
  }


  btnAddListener()

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
    console.log("renderTwoPart(joke) invoked: Takes joke object as argument: blanks out innerhtml of Joke of the Day display elements and displays setup/delivery values in JOD")
  }
  

  function renderOnePart(joke) {
    jokeJod.textContent = ''
    setupJod.innerHTML = ''
    deliveryJod.innerHTML = ''
    jokeJod.textContent = `${joke.joke}`
    console.log("renderOnePart(joke) invoked: Takes joke as argument: blanks out innerhtml of Joke of the Day display elements and displays joke value in JOD")
  }


  function determineJokeType(joke) {
    if (joke.type === "twopart") {
      renderTwoPart(joke)
    } else {
      renderOnePart(joke)
    }
    console.log("determineJokeType invoked: accepts a joke as an argument: if joke.type === twopart else statement: invokes renderTwoPart(joke) or renderOnePart(joke)")
  }


  const submitForm = document.getElementById("submit-a-joke-card")


  function renderSelectButtons() {
    renderOnePartBtn()
    renderTwoPartBtn()
    console.log("renderSelectButtons invoked: calls renderOnePartBtn, renderTwoPartBtn")  
  }


  function onePartBtnClickHandler(event) {                                              // one part create a joke click
    console.log("clicked one-part")
    event.target.parentNode.innerHTML =""
    //event.target.parentNode.reset() didn't work
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
    console.log("OnePartBtnClickHandler invoked: invokes renderSubmitButton, renderTwoPartBtn, createCategoryList, submitOnePartListener, builds form for 1 part joke, e.target.parentNode.inner HTML blankout")  
  }
  

  function twoPartBtnClickHandler(event) {                                          // "two part button click"
    console.log("clicked two part")
    event.target.parentNode.innerHTML =""
    //event.target.parentNode.reset() didn't work
    
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

    console.log("twoPartBtnClickHandler invoked: invokes renderSubmitButton, renderOnePartBtn, createCategoryList, submitTwoPartListener, builds form for 2 part joke, e.target.parentNode.inner HTML blankout")
}


  function renderSubmitButton() {
    const submitButton = document.createElement("button")
    submitButton.id = "submit-button"
    submitButton.type = "submit"
    submitButton.textContent = "Submit a Joke"
    submitForm.append(submitButton)
    console.log("renderSubmitButton invoked: creates submitButton, adds attributes, and appends to submitForm") 
  }


  function renderOnePartBtn() {
    const onePartBtn = document.createElement("button")
    onePartBtn.textContent = "One Part Joke Form"
    onePartBtn.type = "button"
    onePartBtn.id = "one-part-button"
    submitForm.appendChild(onePartBtn)
    onePartBtn.addEventListener("click", (event) => {onePartBtnClickHandler(event)})
    console.log("RenderOnePartBtn() invoked: Accepts no arguments: adds event listener to onePartBtn appends onePartBtn to submitForm adds attributes to onePartBtn, creates onePartBtn")
  }


  function renderTwoPartBtn() {
    const twoPartBtn = document.createElement("button")
    
    twoPartBtn.type = "button"
    twoPartBtn.textContent = "Two Part Joke Form"
    twoPartBtn.id = "two-part-button"
    twoPartBtn.addEventListener("click", (event) => {twoPartBtnClickHandler(event)})
    submitForm.appendChild(twoPartBtn)

    console.log("RenderTwoPartBtn() invoked: Accepts no arguments: adds event listener to twoPartBtn appends twoPartBtn to submitForm adds attributes to twoPartBtn, creates twoPartBtn")
  }
  

  function createCategoryList() 
  {
    const categoryCheckBoxArray =["Any", "Christmas", "Spooky", "Pun", "Programming", "Misc", "Dark"]
    categoryCheckBoxArray.forEach((element) => {
      createCheckBox(element)
    })
  console.log("createCategoryList() Invoked: Accepts no Arguments: runs for each loop on categoryCheckBoxArray and invokes createCheckbox for each array element")
  }
  

  function createCheckBox(checkBoxContent) {
    const checkBox = document.createElement("input")

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

    console.log ("createCheckBox invoked: Accepts a string argument: assigns attributes to a checkbox. prepends box to label, appends label to form. called on every checkbox in the categoryCheckBoxArray")
 }


  function submitOnePartListener() {
    let submitOnePartForm = document.getElementById("submit-a-joke-card")
    
    //  submitOnePartForm.removeEventListener("submit", twoPartBtnClickHandler)
    submitOnePartForm.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault()
    console.log(`${submitEvent} <--- CL submitEventOne`)
  
    const newOPJoke = {
      "category": "empty-category",
      "type": "single",
      "joke": submitEvent.target["joke-input"]["value"]
      }

      radioButtons(newOPJoke)

      console.log(`${newOPJoke["joke"]} I'm the joke called by key in an object inside sopl `)                     //      SUBMIT EVENT CONSOLE LOGS FOR PRESENTATION
      console.log(`${newOPJoke["category"]} I'm the category of the single joke called by key in an object inside sopl`)
      
      submitFormPost(newOPJoke)

      console.log("submitOnePartListener invoked: No arguments:  2 console logs of the object after radioButtons. invokes radioButtons creates newOPJoke object adds event listener to the submitOnePartForm variable")
      
      submitEvent.target.reset()
    })
  }


  function submitTwoPartListener() {
    let submitTwoPartForm = document.getElementById("submit-a-joke-card")
    
    // submitTwoPartForm.removeEventListener("submit", onePartBtnClickHandler)
    submitTwoPartForm.addEventListener("submit", (submitEvent) => {
      submitEvent.preventDefault()

      console.log(`${submitEvent} <--- CL submitEventTwoPL`)                                              //  SUBMIT EVENT CONSOLE LOGS FOR PRESENTATION
      console.log(`${submitEvent.target["setup-input"].value}  <--- console log setup-input value getting the data from the form`)
      console.log(`${submitEvent.target["delivery-input"].value}  <--- console log delivery-input value getting the data from the form`)
      
      const newTPJoke = {
        "category": "empty-category", 
        "type": "twopart",
        "setup": submitEvent.target["setup-input"].value,
        "delivery" : submitEvent.target["delivery-input"].value
      }

      console.log(`"${newTPJoke.category}: newTPJoke.category before radio buttons" "ntpj.SETUP :${newTPJoke.setup}" "ntpj.DELIVERY:${newTPJoke.delivery}"`)
    
      radioButtons(newTPJoke)
      
      console.log(`${newTPJoke["setup"]} I'm the setup called by key in an object inside stplEL`)
      console.log(`${newTPJoke["delivery"]} I'm the delivery called by key in an object inside stplEL`)                       //      SUBMIT EVENT CONSOLE LOGS FOR PRESENTATION
      console.log(`${newTPJoke["category"]} I'm the category of the single joke called by key in an object inside stplEL`)
      
      submitFormPost(newTPJoke)
      
      console.log("submitTwoPartListener invoked: NA: 1 console log of the new joke object, invokes radioButtons(newTPJoke) Creates newTPJoke object adds Event Listener to the submitTwoPartForm variable")
      
      submitEvent.target.reset()
    })
  }
  

  function radioButtons(newJoke) {
    const radios = document.getElementsByName("category-checkbox")
    for (radio of radios) {
      if (radio.checked) {
        newJoke.category = `${radio.value}`
      }}

      console.log("radioButtons invoked: takes a joke object argument: for loop through radios variable using get elementsByName if checked newJoke.category = ${radio.value}")  
  }


  
  function submitFormPost(newJoke)
   {
  fetch("https://v2.jokeapi.dev/submit?dry-run", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJoke)
  })
  .then(resp => resp.json())
  .then((newJokeResp) => {console.log(newJokeResp)
 alert(`"SERVER MESSAGE: "${newJokeResp["message"]}" ADDITIONAL INFO: "${newJokeResp["additionalInfo"]}" "`)
  })
  console.log("submitFormPost invoked: takes jokeObject argument: performs fetch post to the server and then console logs the resp.json(might be out of order fetch)")

  }

  catButtonLooper()
  randomOneJoke()
  renderSelectButtons()
  console.log("init() invoked")

}

init()