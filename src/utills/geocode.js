import request from "request";

const geocode = (city_name, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city_name) + ".json?access_token=pk.eyJ1IjoidXNhbWFyYWphMTI1IiwiYSI6ImNreng1ZmxmeDA1azIyb3M0cGxldmt0bWwifQ.atZm8XDqDLxINGSE-zt7Kw&slkad=1";
    request({ url, json: true }, (error, {body}={}) => {
      if (error) {
        callback("unable to connect to the server", undefined);
      } else if (body.message == "Not Found") {
        callback(body, undefined);
      } else if (body.features.length == 0) {
        callback(
          "Unable to find location.please provide other location",
          undefined
        );
      } else {
        callback(undefined, {
          lat: body.features[0].center[1],
          lng: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    });
  };

  export {geocode as default}