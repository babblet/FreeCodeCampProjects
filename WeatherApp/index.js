//----------------------------------------------------|
// APIs are http based. Make sure you are using http. |
//----------------------------------------------------|

var api_key = "102cc90c055d3a83a2aea350e6f59ab8";
var api_location = "http://ipinfo.io/geo";
var api_weather;
var latitude;
var longitude;
var weather;
var temperature_scale = "Celsius";
var units = "metric";
//-------------------------
var weather_icons = {
    "clear_sky" : "https://image.flaticon.com/icons/svg/136/136723.svg",
    "few_clouds": "https://image.flaticon.com/icons/svg/136/136716.svg",
    "scattered_clouds": "https://image.flaticon.com/icons/svg/136/136701.svg",
    "broken_clouds": "https://image.flaticon.com/icons/svg/136/136701.svg",
    "shower_rain": "https://image.flaticon.com/icons/svg/136/136711.svg",
    "rain": "https://image.flaticon.com/icons/svg/136/136733.svg",
    "thunderstorm": "https://image.flaticon.com/icons/svg/136/136749.svg",
    "snow": "https://image.flaticon.com/icons/svg/136/136710.svg",
    "mist": "https://image.flaticon.com/icons/svg/136/136735.svg"
};

function setLocation(json){
    var loc = json.loc.split(',');
    latitude = loc[0];
    longitude = loc[1];
}

function set_weather_icon(){
  var description = weather.weather[0].description;
    if(description == "clear sky") {
      $(".weather-icon").html("<img src="+weather_icons.clear_sky+"></img>");
    } else if(description == "few clouds") {
      $(".weather-icon").html("<img src="+weather_icons.few_clouds+"></img>");
    } else if(description == "scattered clouds") {
      $(".weather-icon").html("<img src="+weather_icons.scattered_clouds+"></img>");
    } else if(description == "broken clouds") {
      $(".weather-icon").html("<img src="+weather_icons.broken_clouds+"></img>");
    } else if(description == "rain") {
      $(".weather-icon").html("<img src="+weather_icons.rain+"></img>");
    } else if(description == "thinderstrom") {
      $(".weather-icon").html("<img src="+weather_icons.thunderstorm+"></img>");
    } else if(description == "snow") {
      $(".weather-icon").html("<img src="+weather_icons.snow+"></img>");
    } else if(description == "mist") {
      $(".weather-icon").html("<img src="+weather_icons.mist+"></img>");
    } 
}

function changeUi(json){
    $("#country").html(json.name);
    $("#temprature").html(json.main.temp);
    $("#weather").html(json.weather[0].description);
    set_weather_icon();
}

$.getJSON(api_location, function(json_location) {
    setLocation(json_location);
    api_weather = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units="+units+"&appid="+api_key;
  
    $.getJSON(api_weather, function(json_weather){
        weather = json_weather;
        changeUi(weather);
    });
});


$("#units").on("click", function(){
    if(temperature_scale == "Celsius"){
        $("#temprature").html((weather.main.temp*(9/5)) + 32);
        $("#units").html("°F");
        temperature_scale = "Fahrenheit";
    } else if(temperature_scale == "Fahrenheit") {
        $("#temprature").html(weather.main.temp);
        $("#units").html("°C");
        temperature_scale = "Celsius";
    }
});
