import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { BarragesComponent } from './pages/barrages/barrages.component';
import { ChartComponent } from './pages/chart/chart.component';
import { Chart2Component } from './pages/chart2/chart2.component';
import { Chart3Component } from './pages/chart3/chart3.component';
import { PivotComponent } from './pages/pivot/pivot.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { PredictComponent } from './pages/predict/predict.component';
import { PredictReserveComponent } from './pages/predict-reserve/predict-reserve.component';

const routes: Routes = [
  
   { path:'',
    redirectTo: 'weather',
    pathMatch:'full'
  },
  
  
  {
    path: 'barrages',
    component: BarragesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'weather',
    component: WeatherComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'chart',
    component: ChartComponent,
    canActivate: [ AuthGuardService ]
  },

   {
    path: 'pivot',
    component: PivotComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'chart2',
    component: Chart2Component,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'predict',
    component: PredictComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'predict-reserve',
    component: PredictReserveComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'chart3',
    component: Chart3Component,
    canActivate: [ AuthGuardService ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule,DxSelectBoxModule,DxChartModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
