const request = require('request')

const forecast = (longitude, latitude, callback) => {
    url = `https://api.darksky.net/forecast/658a65f9b897b3be4678fa10003712ac/${latitude},${longitude}?units=si`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary}
            Current temperature: ${Math.round(body.currently.temperature)}ºC.
            Minimum temperature: ${Math.round(body.daily.data[0].temperatureMin)}ºC.
            Maximum temperature: ${Math.round(body.daily.data[0].temperatureMax)}ºC.
            Chance of precipitation: ${Math.round(body.currently.precipProbability * 100.0)}%.`)
        }
    })
}

module.exports = forecast