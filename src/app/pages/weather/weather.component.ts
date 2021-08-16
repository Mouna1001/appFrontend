import { Component, OnInit } from '@angular/core';
import { WeatherService } from "src/app/shared/services/weather.service";
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';
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
  forecastData=[];
  chart:any;
  lat;
  lon;
  weather;
  forecastWeather;
  locationDeined = true;
  locationDeinedEnableCity = false;
  forecastDays: string[] = [];

  constructor(private weatherservice:WeatherService, private http: HttpClient){
    console.log("constructor called");
  }
  ngOnInit(){
    this.getLocation();
  }
  /*getforecast(city: string) {
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
  
}*/

 
  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherservice.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        })
        //const name = this.weather.name;
        this.weatherservice.getDailyForecast(this.weather.name).subscribe((data)=>{
          this.details = [];
          //filtering the five days forecast
          for(let i=0;i<data['list'].length;i+=8)
          {
            this.details.push(data['list'][i]);
          }
          this.city=data['city'].name;
          this.country=data['city'].country;     
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
    this.weatherservice.getDailyForecast(city).subscribe((data)=>{
      this.details = [];
      //filtering the five days forecast
      for(let i=0;i<data['list'].length;i+=8)
      {
        this.details.push(data['list'][i]);
      }
      this.details.push(data['city'].name);
      this.saveWeatherData(this.details);
      this.city=data['city'].name;
      this.country=data['city'].country;

      //for(let i=0;i<5;i+=8){
        //this.saveWeatherData(city,data['list'][i].main.temp,data['list'][i].wind.speed,data['list'][i].main.pressure,
        //data['list'][i].main.humidity,data['list'][i].dt_txt); 
      //}
    });
  }
  //saveWeatherData(city,temperature,wind,pression,humidity,date){
  saveWeatherData(temp){
    console.log('1')
    //const dt = formatDate(date,'yyyy-M-dd','en');
    const params = new HttpParams()
    .set('temp',temp) 
    /*.set('temperature',temperature) 
    .set('wind',wind) 
    .set('humidity',humidity) 
    .set('pression',pression)*/ 
    //.set('date',dt) 
    this.http.post('http://localhost:5000/query/saveWeather',{temp})
      .subscribe(res => {
        console.log('res');
      }) 
  }
}