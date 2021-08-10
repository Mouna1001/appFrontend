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
    name: 2020
  },
  {
    id: 2,
    name: 2021
  }]
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
              data: data.filter(flt => flt.year === 2021)
              
            })
          })

          /*this.chartdata.forEach((item: { month: string; reserve: any; }) => {
            if (this.month.indexOf(item.month) == -1) {
              this.month.push(item.month);
            }

            this.monthData.push({
              ...item,
              ['month' + item.month]: item.reserve
            });
          })*/
          // data.forEach((item: { year: string; reserve: any; }) => {
          //   if (this.year.indexOf(item.year) == -1) {
          //     this.year.push(item.year);
          //   }

          //   this.chartdata.push({
          //     ...item,
          //     ['year' + item.year]: item.reserve
          //   });
          // })
          // console.log(this.chartdata, this.year);
        }
        // this.chartdata = res; 
      })
  }

  onYearChanged(data) {
    this.chartdata.filter(['year', '=', data.value]);
    this.chartdata.load();
  }
  onMonthChanged(data) {
    this.chartdata.filter(['month', '=', data.value]);
    this.chartdata.load();
  }
  onValueChanged(data) {
    debugger;
    this.http.get('http://localhost:5000/query')
      .subscribe(res => {
        let data: any = res['rows'];

        if (data && data.length > 0) {
          data.forEach((item: { month: string; reserve: any; }) => {
            if (this.month.indexOf(item.month) == -1) {
              this.month.push(item.month);
            }

            this.monthData.push({
              ...item,
              ['month' + item.month]: item.reserve
            });
          })
          console.log(this.monthData, this.month);
        }
        // this.chartdata = res;
      })
    console.log(data.value)
    this.monthData.filter(['month', '=', data.value]);
    this.monthData.load();
  }
}





