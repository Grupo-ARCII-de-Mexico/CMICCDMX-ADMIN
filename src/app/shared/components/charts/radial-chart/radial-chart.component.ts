import { Component, Input, OnInit } from '@angular/core';
import { RadialBarChart } from '../interfaces/radial-chart.interface';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'radial-chart',
  templateUrl: './radial-chart.component.html',
  styleUrls: ['./radial-chart.component.scss'],
  standalone:true,
  imports:[IonicModule,NgApexchartsModule]
})
export class RadialChartComponent  implements OnInit {
 @Input() public chartOptions!: RadialBarChart;
  constructor() { }

  ngOnInit() {

    if(!this.chartOptions){
      this.chartOptions = {
        series: [76, 67, 61, 90],
        chart: {
          height: 390,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: "30%",
              background: "transparent",
              image: undefined
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
        labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
        legend: {
          show: true,
          floating: true,
          fontSize: "16px",
          position: "left",
          offsetX: 50,
          offsetY: 10,
          labels: {
            useSeriesColors: true
          },
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            horizontal: 3
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false
              }
            }
          }
        ]
      };
    }

  }

}
