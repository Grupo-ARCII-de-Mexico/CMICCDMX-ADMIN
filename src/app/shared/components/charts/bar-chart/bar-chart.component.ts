import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarChartOptions } from '../interfaces/bar-chart.interface';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone:true,
  imports:[IonicModule,NgApexchartsModule]
})
export class BarChartComponent  implements OnInit {
 @Input() public chartOptions!: BarChartOptions;
  constructor() { }

  ngOnInit() {
    if(!this.chartOptions){
      this.chartOptions = {
      
        series: [
          {
            name: "My-series",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: "Grafica de barras de prueba"
        },
        xaxis: {
          categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
        }
      };
    }
  }

}
