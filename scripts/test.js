$(document).ready(function(){
  $(".button-collapse").sideNav();

  $('.parallax').parallax();

  //for each list item in collapsible, run ajax request to return city weather info and append to that c-body
  $(".collapsible-header").on("click",function(){
    var cityInfo = $(this).attr("value");
    
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $.ajax({
      type: "GET",
      url: "http://api.wunderground.com/api/d736e7063cf1620b/conditions/forecast/q/" + cityInfo + ".json",
      dataType: "jsonp",
      success: function(data){
        var weather = data.forecast.simpleforecast.forecastday;
        var city = data.current_observation.display_location.full;
        var newDiv = $("<div>").addClass("collapsible-body grey lighten-2");

        console.log(city);
        console.log(weather);
        //make a new collapsible body and append it to this header
        $(newDiv).append("<h4>Weather in " + city + "</h4>");

        for(i=0; i<weather.length; i++){
          var newConditions = ("<h5 class='flow-text'>Conditions for " + weather[i].date.pretty + ": " + weather[i].conditions + " with a high of " + weather[i].high.fahrenheit + "f, and a low of " + weather[i].low.fahrenheit + "f</h5>");
        
          $(newDiv).append(newConditions);
        }

        //$("li .collapsible-body .active").empty();
        $("li .active").after(newDiv);
      }
    })
  });
});
