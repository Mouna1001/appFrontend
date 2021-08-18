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

    });
  }

  saveWeatherData(temp){
   
    const params = new HttpParams()
    .set('temp',temp) 
  
    this.http.post('https://backend-barrages.herokuapp.com/query/saveWeather',{temp})
      .subscribe(res => {
        console.log('res');
      }) 
  }
}
