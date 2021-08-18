import {  OnInit } from '@angular/core';
import {  Component, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild} from '@angular/core';
import { DxPivotGridComponent,
         DxChartComponent } from 'devextreme-angular';
      


if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss']
})

export class PivotComponent implements OnInit {
  @ViewChild(DxPivotGridComponent, { static: false }) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;

  Pivotdata: any;
  allowSearch: boolean = true;
  showRelevantValues: boolean = true;
  showDataFields: boolean = true;
  showRowFields: boolean = true;
  showColumnFields: boolean = true;
  showFilterFields: boolean = true;
  showTotalsPrior = false;
  rowsDataFieldArea = false;
  treeHeaderLayout = true;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void { 
    this.getDataFromServer();
  }
  
  getDataFromServer() {
    this.http.get('https://backend-barrages.herokuapp.com/route')
    .subscribe(res => {
      
       
      
      this.Pivotdata = res;
      if(this.Pivotdata){
        this.Pivotdata.forEach(element => {
          element.date = new Date(element.date);
        });
      }
      this.Pivotdata={
        store:this.Pivotdata,
        fields:[{
          caption : "Taux de remplissage",
          dataField:"fill_rate",
          summaryType: "avg",
          format:{
             type: "largeNumber",
             precision:2
          },        
 
        },
        {
          caption : "Nom",
          dataField:"name",},
        {
         caption : "Capacité normale",
         dataField:"normal_capacity",
         summaryType: "avg",
         format:{
            type: "largeNumber",
            precision:2
         },
         
        },
        {caption : "Réserve",
          dataField:"reserve",
          summaryType: "avg",
          format:{
             type: "largeNumber",
             precision:2
          },
          }
       
       ]
 
      }
     
    
    })
  } 
  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });
  }
  customizeTooltip(args) {
    return {
      html: args.seriesName + " " + args.valueText + "</div>"
    };
  }
  contextMenuPreparing(e) {
    var dataSource = e.component.getDataSource(),
        sourceField = e.field;

    if (sourceField) {
        if (!sourceField.groupName || sourceField.groupIndex === 0) {
            e.items.push({
                text: "Hide field",
                onItemClick: function () {
                    var fieldIndex;
                    if (sourceField.groupName) {
                        fieldIndex = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
                    } else {
                        fieldIndex = sourceField.index;
                    }

                    dataSource.field(fieldIndex, {
                        area: null
                    });
                    dataSource.load();
                }
            });
        }

        if (sourceField.dataType === "number") {
           
            var setSummaryType = function (args: { itemData: { value: any; }; }) {
                dataSource.field(sourceField.index, {
                    summaryType: args.itemData.value,
                    
                });

                dataSource.load();
            },
                menuItems = [];

            e.items.push({ text: "Summary Type", items: menuItems });

            for (let summaryType of ["Sum", "Avg", "Min", "Max"]) {
                var summaryTypeValue = summaryType.toLowerCase();
               
                

                menuItems.push({
                    text: summaryType,
                    value: summaryType.toLowerCase(),
                    onItemClick: setSummaryType,
                    selected: e.field.summaryType === summaryTypeValue,
              

                });
            };
        }
        
    }
   
}

  
}