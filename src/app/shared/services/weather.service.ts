import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

const apiKey = "dbbeade91a462b1ad4d5b970c802a323";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?";

@Injectable()
export class WeatherService {

  constructor(public http:HttpClient) {
    console.log("open weather service connected");
   }

   getPost(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res);
      }

      /*getWeatherDetails(){
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=casablanca,MA&units=metric&appid=dbbeade91a462b1ad4d5b970c802a323').map(res => res);
      }*/
      getDailyForecast(city: string)  {
        let params = new HttpParams()
          .set('q', city)
          .set('units', 'metric')
          .set('appid', apiKey);
          return this.http.get(forecastUrl, { params });;
      }
      getWeatherDataByCityName(city: string) {
        let params = new HttpParams()
          .set('q', city)
          .set('units', 'metric')
          .set('appid', apiKey);
        return this.http.get(baseUrl, { params });
      } 
      getWeatherDataByCoords(lat, lon) {
        let params = new HttpParams()
          .set('lat', lat)
          .set('lon', lon)
          .set('units', 'metric')
          .set('appid', apiKey);
        return this.http.get(baseUrl, { params });
      }
      getForecastDataByCoords(lat, lon) {
        let params = new HttpParams()
          .set('lat', lat)
          .set('lon', lon)
          .set('units', 'metric')
          .set('appid', apiKey);
        return this.http.get(forecastUrl, { params });
      }
}
