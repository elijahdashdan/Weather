const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const city = req.body.cityName
  const appID = "e0dda203abaabc36d778230ed0384aa8"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID +"&units=metric"

  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The Temperature is " + temp + " degrees Celcius.</h1>");
      res.write("<p>The weather in " + city +" is currently " + weatherDescription + ".</p>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  })
});


app.listen(3000, function() {
  console.log("Port running at 3000");
});
