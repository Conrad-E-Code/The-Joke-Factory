fetch('https://v2.jokeapi.dev/joke/Pun?amount=10?format=json')
.then(resp => resp.json())
.then(jokeData => {
  console.log(jokeData);
})

