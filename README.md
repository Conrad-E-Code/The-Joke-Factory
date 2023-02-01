# The Joke Factory!

Group project for Liv Nelson, Bryan Sun, and Conrad Etherington.

Interative Javascript web app allowing users to fetch jokes from an external joke API.
<br/><br/>
  Features:
<br/>
<br/>
Joke of the Day:
<br/>
When the page is loaded it fetches a random joke from the API and renders it, properly formatted, to the screen.
<br/><br/>
Random Joke Button:
<br/>
Fetches a new random joke and renders it to the page.
<br/><br/>
Jokes By Category:
<br/>
Buttons are rendered to the page allowing users to select a joke category. Once Selected, the button will fetch 10 jokes from the API and render them to the page one at a time. Users then scroll through the jokes using the left and right arrow keys. Upon reaching the end of the list of jokes, If a user scrolls forward again, 10 additional jokes will be fetched from the category allowing users to endlessly cycle through the jokes in a category.
<br/><br/>
Submit A Joke:
<br/>
A dynamically rendered form allowing users to send properly formatted jokes inside a POST request to the external API.
  Renders Server Response to the page as an alert.
  <br/><br/>
In this project We were able to successfully communicate with an external API with GET and POST requests. We were able to conform to the limitations of the preexisting API without sacrificing the user experience by getting creative with our JavaScript functionality and utilizing available endpoints.
<br/><br/>
API Documentation:
<br/>
https://v2.jokeapi.dev/
