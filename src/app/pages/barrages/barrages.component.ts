import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barrages',
  templateUrl: './barrages.component.html',
  styleUrls: ['./barrages.component.scss']
})
export class BarragesComponent implements OnInit {
  gridData: Object;
 
  constructor(private http: HttpClient) { }

  ngOnInit(): void { 
    this.getDataFromServer();     
  }
   
  getDataFromServer() {
    this.http.get('http://localhost:5000/route')
    .subscribe(res => {
      this.gridData = res;
    })
  } 

}
