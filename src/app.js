// Express is a function
const express = require('express')
const path = require('path')

const app = express()

// Paths for Express config
const publicDir = path.join(__dirname, '../public')
const templatesDir = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', templatesDir)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    // Gets the view, converts it to html e returns to the user
    // We can pass in values (an object) to this template
    res.render('index', {
        title: 'Weather',
        name: 'Andre Goncalves'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andre Goncalves'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andre Goncalves',
        message: 'This is a temporary help message!!!'
    })
})

app.get('/weather', (req, res) => {
    res.send([{
        location: 'Belas, Lisboa, Portugal',
        forecast: 'Foggy, 20 degrees Celsius.'
    }])
})

// Starts the server and makes it listen on a specific port
// 3000 is a common development port
// The second parameter (optional) is a callback function that we can call when the server starts
// The process of starting up a server is an asynchronous process
app.listen(3000, () => {
    console.log('Server has started on port 3000')
})