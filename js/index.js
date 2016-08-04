$(document).ready(function() {
  var lon, lat;

  $.getJSON("http://ip-api.com/json", function(data) {
    lat = data.lat;
    lon = data.lon;
    // console.log(lat,lon);
    // Create API with Geolocation
    var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=8bd135b9bb07ffe29eeadfd15a0bf61e';
    // console.log(api);
    $.getJSON(api, function(data1) {

      // get data from API
      var city = data1.name;
      var country = data1.sys.country;
      var weatherMain = data1.weather[0].main;
      // console.log(weatherMain);
      var weatherType = data1.weather[0].description;
      var weatherTypeString = capitalizeFirstLetter(weatherType);
      var ktemp = data1.main.temp; //temp in kelvin
      var ftemp; //fahrenheit
      var ctemp; //celsius
      var tempSwap = true; // temp var for swapping temp values
      ftemp = Math.round((ktemp) * (9 / 5) - 459.67);
      // console.log(ftemp);
      ctemp = Math.round((ktemp) - 273);
      // console.log(ctemp);

      // console.log(api);

      $("#city").html(city);
      // console.log(city);
      $("#country").html(country);
      // console.log(country);
      $("#weatherType").html(weatherTypeString);
      // console.log(weatherType);

      $("#ctemp").html(ctemp + " &#8451");
      $("#ctemp").click(function(){
        if (tempSwap === false) {
          $("#ctemp").html(ctemp + " &#8451");
          tempSwap = true;
        } else {
          $("#ctemp").html(ftemp + " &#8457");
          tempSwap = false;
        }
      }); // end ctemp/ftemp swap

      if( ctemp > 30){
        $('body').css('background-image', 'url(https://cdn.cloudpix.co/images/sunny/sunny-day-wallpaper-weather-67eb048e101364cb35a5e03504acb949-large-533645.jpg)');
      } else if(ctemp <= 0) {
        $('body').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/e/e3/After_a_heavy_snow_storm_-_geograph.org.uk_-_90391.jpg)');
      }

    }); //end inner getJSON
  }); //end outer getJSON
});

// Capitalize First Letter
function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}