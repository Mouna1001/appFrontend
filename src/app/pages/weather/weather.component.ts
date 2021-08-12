import { Component, OnInit } from '@angular/core';
import { WeatherService } from "src/app/shared/services/weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  title = 'Prévisions météorologiques';
  city:String;
  country:String;
  details=[];
  chart:any;
  lat;
  lon;
  weather;
  forecastWeather;
  locationDeined = true;
  locationDeinedEnableCity = false;
  forecastDays: string[] = [];

  constructor(private weatherservice:WeatherService){
    console.log("constructor called");
  }
  ngOnInit(){
    this.getLocation();
    this.weatherservice.getWeatherDetails().subscribe((data)=>{

      console.log(data);
     // this.details=data['list'];

     //filtering the five days forecast
      for(let i=0;i<data['list'].length;i+=8)
        {
          this.details.push(data['list'][i]);
        }
        this.city=data['city'].name;
        this.country=data['city'].country;

      
    });
  }
  getforecast(city: string) {
  this.weatherservice.getDailyForecast(city).subscribe(data => {
    this.forecastWeather = Array.of(data);
     console.log("Forecast Data : ", data); // Log forecast weather data
    // Get forecast Days
        for(let i=0;i<data['list'].length;i+=8)
        {
          this.details.push(data['list'][i]);
        }
        this.city=data.city.name;
        this.country=data.city.country;
        })
  
}

 
  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherservice.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        });
      }, (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          this.locationDeined = false;
          this.locationDeinedEnableCity = true;
          }
        });
    }
  }
  getCity(city) {
    this.weatherservice.getWeatherDataByCityName(city).subscribe((data: any) => {
      this.weather = data;
      this.lat = data.coord.lat;
      this.lon = data.coord.lon;
    });
  }
}