//jshint esversion:6

const express = require('express');
const bodyParser=require("body-parser");
const https=require("https");
const request=require("request");

const app = express();
const key="2586bbb8f6c285d7841e7a43148b107d";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/images",  express.static(__dirname + '/public/images'));
app.use("/language",  express.static(__dirname + '/public/language'));
let items=[];
let icon = "";

app.get('/', function (req, res) {
  const today = new Date();
  const currentDay = today.getDate();
  const options = {
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
    };
  const day = today.toLocaleDateString("en-US",options);
  res.render("list",{kindOfDay: day ,addedItems: items, weatherIcon: icon})
});

app.post('/', function (req, res) {
    //console.log(req.body);
    var city = req.body.city;
    var units = req.body.units;
    var selectLng = req.body.currentLng;
    var lang_code=""
    if ( selectLng === "ch" ) {
      lang_code="zh_cn"
    } else {
      lang_code="en"
    }

    console.log("selectLng=" + selectLng);
    if ( units === "C" ) {
      inUnits = "metric";
      degreeUnits=" &#8451;"
    } else {
      inUnits = "imperial";
      degreeUnits=" &#8457;"
    }

    var url="https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units=" + inUnits + "&APPID=" + key + "&lang="+lang_code;

    if ( city === "" ) {
      items=[];
      res.redirect("/")
    } else {
        //console.log(url);
      https.get(url,function(response){
        //console.log(response);
      if (response.statusCode === 200 ) {
        response.on("data",function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          icon = weatherData.weather[0].icon;
          const weatherDescription = weatherData.weather[0].description;
          const humidity = weatherData.main.humidity;
          const temp_min = weatherData.main.temp_min;
          const temp_max = weatherData.main.temp_max;
          const img="http://openweathermap.org/img/wn/" + icon + "@2x.png";
          //console.log(icon);
          items=[];
          if (selectLng ==="en") {
          items.push("The weather of " + city + " is currently");
          items.push(weatherDescription);
          items.push("Temperature : " + temp  + " " + degreeUnits );
          items.push("Humidity ：" + humidity +"%");
          items.push("Today's lowest Temperature : " + temp_min + " " + degreeUnits );
          items.push("Today's highest Temperature : " + temp_max + " " + degreeUnits );
        } else {
          items.push(city + " 目前天气");
          items.push(weatherDescription);
          items.push("温度 ： " + temp  + " " + degreeUnits );
          items.push("湿度 ： " + humidity +"%");
          items.push("今天最高温度 ： " + temp_min + " " + degreeUnits );
          items.push("今天最低温度 ： " + temp_max + " " + degreeUnits );

        }
          res.redirect("/")
          res.end();
        });
        } else{
            items=[];
            res.redirect("/")
        }
    });
  }
});

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port "3000"`))
