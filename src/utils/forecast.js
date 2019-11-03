const request = require('request')

const forecast = (longitude, latitude, callback) => {
    url = `https://api.darksky.net/forecast/***REMOVED***/${latitude},${longitude}?units=si`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary}\nCurrent temperature: ${body.currently.temperature} degrees Celsius.\nMinimum temperature: ${body.daily.data[0].temperatureMin} degrees Celsius.\nMaximum temperature: ${body.daily.data[0].temperatureMax} degrees Celsius.\nChance of precipitation: ${body.currently.precipProbability * 100.0}%.`)
        }
    })
}

module.exports = forecast