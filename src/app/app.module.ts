import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app-routing.module';
import { BarragesComponent } from './pages/barrages/barrages.component';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule } from 'devextreme-angular';
import { DxChartModule,DxSelectBoxModule} from 'devextreme-angular';
import { ChartComponent } from './pages/chart/chart.component';
import { PivotComponent } from './pages/pivot/pivot.component';
import { DxPivotGridModule,DxCheckBoxModule, DxButtonModule } from 'devextreme-angular';
import { Chart2Component } from './pages/chart2/chart2.component';
import { Chart3Component } from './pages/chart3/chart3.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { HttpClient } from "@angular/common/http";
import { WeatherService } from "src/app/shared/services/weather.service";
import { PredictComponent } from './pages/predict/predict.component';
import { FormsModule } from '@angular/forms';
import { PredictReserveComponent } from './pages/predict-reserve/predict-reserve.component';



@NgModule({
  declarations: [
    AppComponent,
    BarragesComponent,
    ChartComponent,
    PivotComponent,
    Chart2Component,
    Chart3Component,
    WeatherComponent,
    PredictComponent,
    PredictReserveComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    FormsModule,
    HttpClientModule,
    DxDataGridModule,
    DxChartModule,
    DxSelectBoxModule,
    AppRoutingModule,
    BrowserModule,
    DxPivotGridModule,
    DxCheckBoxModule,
    DxButtonModule
    
    
  ],
  providers: [WeatherService,HttpClientModule,HttpClient,AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent],
  
    
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);