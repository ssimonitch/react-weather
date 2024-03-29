const axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=8bc1290553826119a6e8d6168fd7135a&units=metric';

// API KEY: 8bc1290553826119a6e8d6168fd7135a

module.exports = {
  getTemp: function (location) {
    let encodedLocation, requestUrl, zip;

    if ( /^\d{5}$/.test(location) ) {
      zip = location;
      requestUrl = `${OPEN_WEATHER_MAP_URL}&zip=${location}`;
    } else {
      encodedLocation = encodeURIComponent(location);
      requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    }

    return axios.get(requestUrl).then(function (res) {
      if (res.data.cod && res.data.message) {
        throw new Error(res.data.message);
      } else {
        if (zip == undefined && res.data.name.toLowerCase() !== location.toLowerCase()) {
          throw new Error("Invalid city name")
        } else {
          return {
            temp: res.data.main.temp,
            city: res.data.name,
          };
        }
      }
    }, function (err) {
      throw new Error(err.response.data.message);
    });
  }
}
