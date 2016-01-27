$(document).ready(function(){
  $(".button-collapse").sideNav();

  $('.parallax').parallax();

  $('.collapsible').collapsible();

  //for each list item in collapsible, run ajax request to return city weather info and append to that c-body
  //$().on("click",function(){
  var cityInfo = $(".collapsible-header");

  for (var i = 0; i < cityInfo.length; i++) {
    var location = $(cityInfo[i]).attr("value");
    debugger;
    getWeather();
    console.log(location);
  };
    
    function getWeather(){
      $.ajax({
        type: "GET",
        url: "http://api.wunderground.com/api/d736e7063cf1620b/conditions/forecast/q/" + location + ".json",
        dataType: "jsonp",
        success: function(data){
          var weather = data.forecast.simpleforecast.forecastday;
          var city = data.current_observation.display_location.full;
          var wPicUrl = data.current_observation.icon_url;
          var newWPic = $("<img>").attr("src", wPicUrl);
          var newDiv = $("<div>").addClass("collapsible-body grey lighten-2");

          console.log(wPicUrl);
          console.log(city);
          console.log(weather);
          //make a new collapsible body and append it to this header
          $(newDiv).append("<h4>Weather in " + city + "</h4>")
            .append(newWPic);

          for(j=0; j<weather.length; j++){
            var newConditions = ("<h5 class='flow-text'>Conditions for " + weather[j].date.pretty + ": " + weather[j].conditions + " with a high of " + weather[j].high.fahrenheit + "f, and a low of " + weather[j].low.fahrenheit + "f</h5>");
          
            $(newDiv).append(newConditions);
            debugger;
            //i is already 8 at this point
            //if collapsible header value matches city add newDiv after
            for (var k = 0; k < cityInfo.length; k++) {
              console.log($(cityInfo[k]));
              //erases info from previous loop and adds to current k
              $(cityInfo[k]).after(newDiv);
            };            
          }
          //$("li .collapsible-body .active").empty();         
        }
      })
    }
  //});
});
