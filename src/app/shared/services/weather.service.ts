import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  constructor(public http:HttpClient) {
    console.log("open weather service connected");
   }

   getPost(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res);
      }


      getWeatherDetails(){
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=rabat,MA&units=metric&appid=dbbeade91a462b1ad4d5b970c802a323').map(res => res);
      }
      
}
