import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chartdata: any;
  year: any = [];
  month: any = [];
  monthData: any = [];
  data: any = [];
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

  getDataFromServer() {
    this.http.get('http://localhost:5000/query')
      .subscribe(res => {
        debugger;
        
        let data: any = res['rows'];

        if (data && data.length > 0) {
          // data.year2020 = data.filter(flt => flt.year === 2020);
          // data.year2021 = data.filter(flt => flt.year === 2021);
          this.chartdata = new DataSource({
            store: new ArrayStore({
              data: data.filter((flt: { year: number; }) => flt.year == 2020 ) 
              
            }) 
          })
        }
      })
        
  }

  onYearChanged(data: { value: any; }) {
    this.chartdata.filter(['year', '=', data.value]);
    this.chartdata.load();
  }
  onMonthChanged(data: { value: any; }) {
    this.chartdata.filter(['month', '=', data.value]);
    this.chartdata.load();
  }
  
}





