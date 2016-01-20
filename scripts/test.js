$(document).ready(function(){
  $(".button-collapse").sideNav();

  $('.parallax').parallax();

  //for each item in collection, run ajax request to return city weather info
  $.ajax({
    type: "GET",
    url: "http://api.wunderground.com/api/d736e7063cf1620b/conditions/forecast/q/08873.json",
    dataType: "jsonp",
    success: function(data){
      var weather = data.forecast.simpleforecast.forecastday;

      console.log(weather);

      for(i=0; i<weather.length; i++){
        console.log("Conditions for " + weather[i].date.pretty + ": " + weather[i].conditions + " with a high of " + weather[i].high.fahrenheit + "f, and a low of " + weather[i].low.fahrenheit + "f");
      }
    }
  })
});
