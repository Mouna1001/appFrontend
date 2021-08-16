import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-predict',
  templateUrl: './predict-reserve.component.html',
  styleUrls: ['./predict-reserve.component.scss']
})
export class PredictReserveComponent implements OnInit {

  message = '';
  constructor(private httpclient: HttpClient) { }

  payload = {
    Name: '',
    Fill_rate: 0,
    day_name: '',
    month_name: '',
    Year: 0,
  }

  ngOnInit(): void {
  }

  submitClickHandler() {
    this.httpclient.post('https://reserve-prediction.herokuapp.com/predict', this.payload).subscribe((data: any) => {
      this.message = data.message;
    }
  
    );
  } 
}    

