// This hides the results sections
$("main").hide();

// This shows the correspondant date above every single card
$("#current-date").text("(" + moment().format("L") + ")");
$("#current-date1").text(moment().add("days", 1).format("L"));
$("#current-date2").text(moment().add("days", 2).format("L"));
$("#current-date3").text(moment().add("days", 3).format("L"));
$("#current-date4").text(moment().add("days", 4).format("L"));
$("#current-date5").text(moment().add("days", 5).format("L"));

function startSearch() {
  localStorage.setItem("city name", $("#city-search").val());
  // this creates the li elements in the browsing history section
  var city = localStorage.getItem("city name");

  // This clears the text in the input
  $("#city-search").val("");
  // This shows the results sections
  $("main").show();

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=d3781c349f9e3f57b40f21c1afb145d1";

  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then(function (response) {
      localStorage.setItem("city name", response.name);
      // this creates the li elements in the browsing history section
      var city = localStorage.getItem("city name");


      // This changes the values for the name of the city
      $("#input-value").html(city + ":");
      $("h5").html(city);
      $("#temperature").html(response.main.temp.toFixed() + " ºF");
      $("#wind").html(response.wind.speed.toFixed() + " mph");
      $("#humidity").html(response.main.humidity.toFixed() + " %");

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      // this section is for the UV index part

      // This sets the URL and stores it in the var UVurl
      var UVurl =
        "https://api.openweathermap.org/data/2.5/uvi?&lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=d3781c349f9e3f57b40f21c1afb145d1";

      // This makes the ajax call to get the data
      $.ajax({
        url: UVurl,
        method: "GET",
      }).then(function (response) {
        $("#uv").html(response.value);

        // This changes the color
        if (response.value <= 3) {
          $("#uv").css("background-color", "#378070");
        } else if (response.value > 3 && response.value <= 6) {
          $("#uv").css("background-color", "#bece61");
        } else if (response.value > 6 && response.value <= 10) {
          $("#uv").css("background-color", "#ce6161");
        } else {
          $("#uv").css("background-color", "#af61ce");
        }
      });

      // This gets the icons that are already given by the API
      var icon = response.weather[0].icon;
      // This sets the url
      var iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // This changes the html
      $("#current").attr("src", iconurl);

      // This sets the forecast URL
      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=d3781c349f9e3f57b40f21c1afb145d1&lat=" +
        lat +
        "&lon=" +
        lon;

      // THIS gets the forecast for the 5 days
      $.ajax({
        url: forecastURL,
        method: "GET",
      }).done(function (response) {
        // This gets the temperature from the response array
        $("#temperature-1").html(response.list[0].main.temp.toFixed() + " ºF");
        // This gets the wind speed from the response array
        $("#wind-1").html(response.list[0].wind.speed.toFixed() + " mph");
        // This gets the humidity from the response array
        $("#humidity-1").html(response.list[0].main.humidity.toFixed() + " %");

        $("#temperature-2").html(response.list[1].main.temp.toFixed() + " ºF");
        $("#wind-2").html(response.list[1].wind.speed.toFixed() + " mph");
        $("#humidity-2").html(response.list[1].main.humidity.toFixed() + " %");

        $("#temperature-3").html(response.list[2].main.temp.toFixed() + " ºF");
        $("#wind-3").html(response.list[2].wind.speed.toFixed() + " mph");
        $("#humidity-3").html(response.list[2].main.humidity.toFixed() + " %");

        $("#temperature-4").html(response.list[3].main.temp.toFixed() + " ºF");
        $("#wind-4").html(response.list[3].wind.speed.toFixed() + " mph");
        $("#humidity-4").html(response.list[3].main.humidity.toFixed() + " %");

        $("#temperature-5").html(response.list[4].main.temp.toFixed() + " ºF");
        $("#wind-5").html(response.list[4].wind.speed.toFixed() + " mph");
        $("#humidity-5").html(response.list[4].main.humidity.toFixed() + " %");

        // This section is to get the proper icon for each weather
        var icon1 = response.list[1].weather[0].icon;
        // This sets the url
        var iconurl1 = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
        // This changes the html
        $("#current-1").attr("src", iconurl1);

        var icon2 = response.list[2].weather[0].icon;
        var iconurl2 = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";
        $("#current-2").attr("src", iconurl2);

        var icon3 = response.list[3].weather[0].icon;
        var iconurl3 = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png";
        $("#current-3").attr("src", iconurl3);

        var icon4 = response.list[4].weather[0].icon;
        var iconurl4 = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png";
        $("#current-4").attr("src", iconurl4);

        var icon5 = response.list[5].weather[0].icon;
        var iconurl5 = "http://openweathermap.org/img/wn/" + icon5 + "@2x.png";
        $("#current-5").attr("src", iconurl5);
      });

      // This is to avoid creating empty buttons
    }).fail(function () {
      // This will remove the button created by the error
      
      // This will set an alert
      window.alert("City not found");
      $("#history-ul")[0].children[0].remove();
    });
}

// This saves the city in the browsing history
$("#search-btn").click(function () {
  event.preventDefault();
  // This arranges the list element starting by the most recent search
  $("#history-ul").prepend(
    $("<button class='btn2'>").html($("#city-search").val())
  );
  startSearch();
});

// This changes the info when you click a city from the Browsing History
$("#history-ul").on("click", "button.btn2", function (event) {
  // This changes the HTML
  $("#city-search").val($(this).html());
  startSearch();
  $("#input-value").html($(this).html() + ":");
  $("h5").html($(this).html());
});

// This clears the browsing history
$("#clear").click(function () {
  $(".btn2").remove();
});
