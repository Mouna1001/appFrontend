import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class Chart3Component implements OnInit {

  chartdata: any = [];
  

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer() {
  
    this.http.get('http://localhost:5000/select')
    .subscribe(res => {
      this.chartdata = res['rows'];
    })
  }  

       
}
