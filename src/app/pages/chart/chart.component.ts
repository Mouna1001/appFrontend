import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { formatDate } from '@angular/common';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { $ } from 'protractor';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartdata: any;
  y: any;
  m: any;
  year: any = [];
  month: any = [];
  monthData: any = [];
  data: any = [];
  date = new Date();
  years: any = [{
    id: 1,
    name: 2017
  },
  {
    id: 2,
    name: 2018
  },
  {
    id: 3,
    name: 2019
  },
  {
    id: 4,
    name: 2020
  },
  {
    id: 5,
    name: 2021
  }
]
  months: any = [{
    id: 1,
    name: "Janvier"
  }, {
    id: 2,
    name: "Février"
  }, {
    id: 3,
    name: "Mars"
  }, {
    id: 4,
    name: "Avril"
  }, { 
    id: 5,
    name: "Mai"
  }, {
    id: 6,
    name: "Juin"
  }, {
    id: 7,
    name: "Juillet"
  }, {
    id: 8,
    name: "Août"
  }, {
    id: 9,
    name: "Septembre"
  }, {
    id: 10,
    name: "Octobre"
  }, {
    id: 11,
    name: "Novembre"
  }, {
    id: 12,
    name: "Décembre" 
  }];
  constructor(private http: HttpClient) { } 
  ngOnInit(): void {
    this.getDataFromServer();    
  }

  getDataFromServer(year=null, month=null) { 
    if(year==null && month==null){
      this.y = formatDate(this.date,'yyyy','en')
      this.m = formatDate(this.date,'M','en')
    }else{
      if(year==null && month !=null){
        this.y = formatDate(this.date,'yyyy','en')
        this.m=month
      }else if(year!=null && month==null){
        this.y=year
        this.m = formatDate(this.date,'M','en')
      }else if (year!=null && month !=null){
        this.y=year
        this.m=month
      }
    }
    const params = new HttpParams()
    .set('year',this.y) 
    .set('month',this.m) 
    this.http.get(' https://backend-barrages.herokuapp.com/query',{params})
      .subscribe(res => {
       
        let data: any = res['rows'];
        if (data && data.length > 0) {
          this.chartdata = data
          
        }
      })        
  }

  
  onSubmit(month,year){
    this.getDataFromServer(year,month);    
  }  
}





