// fetch the url, then run the function
fetch('http://localhost:3000/weather?address=lisbon')
    .then((response) => response.json())
    .then((data) => console.log(data))