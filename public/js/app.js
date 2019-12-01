const weatherForm = document.querySelector('form')
const textInput = document.querySelector('input[type=text]')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    // Grab event to prevent default behaviour (refresh page)
    event.preventDefault()

    const location = textInput.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // Fetch the url, then run the function
    fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})