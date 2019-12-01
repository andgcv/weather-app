# Weather-App

## [Check it live here](https://andgcv-weather-app.herokuapp.com/)

Simple web application to request forecast data on a given location. Uses Mapbox's Geolocation API and DarkSky's Forecast API. Created with Node.js and its framework Express.

### To run the application in development mode:

```shell
 npm run dev
 ```

_Don't forget to create an **.app-env** file with your Dark Sky and MapBox Geolocation API key. Format:_

``` shell
FORECAST_KEY = your_forecast_api_key
GEO_KEY = your_geolocation_api_key
```