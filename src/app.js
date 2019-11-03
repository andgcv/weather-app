// Express is a function
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    // Gets the view, converts it to html e returns to the user
    // We can pass in values (an object) to this template
    res.render('index', {
        title: 'Weather',
        name: 'André Gonçalves'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'André Gonçalves'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a temporary help message!!!',
        name: 'André Gonçalves'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404_error', {
        title: '404 Error',
        errorMessage: 'Help article not found.',
        name: 'André Gonçalves'
    })
})

app.get('*', (req, res) => {
    res.render('404_error', {
        title: '404 Error',
        errorMessage: 'Page not found',
        name: 'André Gonçalves'
    })
})

// Starts the server and makes it listen on a specific port
// 3000 is a common development port
// The second parameter (optional) is a callback function that we can call when the server starts
// The process of starting up a server is an asynchronous process
app.listen(3000, () => {
    console.log('Server has started on port 3000')
})