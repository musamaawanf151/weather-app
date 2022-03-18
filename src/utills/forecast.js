import request from "request";
const forecast = (lat, lng, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3f783bb842f04caa778abc7c91cf7948&query=" +    
    lat +
    "," +
    lng;
  request({ url: url, json: true }, (error, { body } = {}) => {
    
    if (error) {
      callback("unable to connect to the server", undefined);
    } 
    else if (body.error) {
      callback(body.error, undefined);
    } 
    else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " their is currently " +
          body.current.temperature +
          " degree in City : " +
          body.location.name +
          " Country : " +
          body.location.country
      );
    }
  });
};
export { forecast as default };
