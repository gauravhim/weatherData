const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const long = req.body.longitude;
  const lat = req.body.lattitude;
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "ec39aec8d516f5d725f665005e92d09f";
  const units = "metric";
  const queryParameter = "lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=" + units;

  https.get(url + "?" + queryParameter, function(eRes){
    eRes.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      res.write("<h1>The current temp is " + weatherData.main.temp + " celcius</h1>");
      res.write("<h2> Weather description: " + weatherData.weather[0].description + "</h2>");
      res.write("<img src=http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +"@2x.png>");
      res.send();
    })
  })

});



// Port - to run on heorku (dynamic port) and local host
app.listen(process.env.PORT || 3000, function(){
  console.log("The server is running at port 3000 successfully");
});
