const request = require('request')
const geoKey = process.env.GEO_KEY

const geocode = (address, callback) => {
    // Use encodeURIComponent() incase someone searches for an address that contains special characters, like '?', which becomes '%3F' with this function
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${geoKey}`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.message === "Forbidden" || body.features.length === 0) {
            callback('Unable to find location, try again with a different searching term.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode