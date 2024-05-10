import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PieChartOptions } from '../interfaces/pie-chart.interface';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  standalone:true,
  imports:[IonicModule,NgApexchartsModule]
})
export class PieChartComponent  implements OnInit {
  @Input() chartOptions!: PieChartOptions;
  constructor() { }

  ngOnInit() {
    if(!this.chartOptions){
      this.chartOptions = {
        series: [44, 55, 13],
        chart: {
          width: 450,
          type: "donut"
        },
        labels: ["Team A", "Team B", "Team C",],
        responsive: [
          
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    }
  }

}
