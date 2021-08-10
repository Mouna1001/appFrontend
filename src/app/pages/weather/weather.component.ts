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
  constructor(private weatherservice:WeatherService){
    console.log("constructor called");
  }
  ngOnInit(){
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
}