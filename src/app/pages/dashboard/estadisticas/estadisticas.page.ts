import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { switchMap, tap } from 'rxjs/operators';
import { BarChartOptions } from 'src/app/shared/components/charts/interfaces/bar-chart.interface';
import { PieChartOptions } from 'src/app/shared/components/charts/interfaces/pie-chart.interface';
import { RadialBarChart } from 'src/app/shared/components/charts/interfaces/radial-chart.interface';
import { Apoyos, ApoyosRepository } from 'src/app/shared/repos/apoyo.repository';
import { Evento, EventoRepository } from 'src/app/shared/repos/evento.repository';
import { Negocio, NegocioRepository } from 'src/app/shared/repos/negocio.repository';
import { HEXGenerator } from 'src/app/shared/tools/hex.generator';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  barchartEvento!:BarChartOptions;
  radialChartEvento!:RadialBarChart;
  eventos:Evento[]=[];
  apoyos:Apoyos[]=[];
  negocios:Negocio[]=[];
  constructor(
    private eventoRepo:EventoRepository,
    private apoyoRepo:ApoyosRepository,
    private oportunidadRepo:NegocioRepository
  ) { }

  ngOnInit() {
    this.eventoRepo.evento$.pipe(
      switchMap( eventos => {
        this.eventos = eventos;
        this.graficasEventos();
        return this.apoyoRepo.user$
      }),
      switchMap( apoyos => {
        this.apoyos = apoyos;
        return this.oportunidadRepo.negocio$
      } ),
      tap(negocios => {
        this.negocios = negocios;
      })
    ).subscribe()
  
  }

  ionViewWillEnter(){
    this.graficasEventos();
  }

  graficasEventos(){
    let meses: any = [];
    const eventos = new Array(12).fill(0);
    const radiales = new Array(3).fill(0);
    this.eventos = this.eventos.sort((a,b) => new Date(a.fechaInicio).getTime() -new Date(b.fechaInicio).getTime())
    this.eventos.forEach(item => {
      for( const bol of item.boletos){
        radiales[0]++
        if(bol.active && !item.esGratis ){
          radiales[1]++
        }else{
          radiales[2]++
        }
      }
      const date = moment(item.fechaInicio);
      const key = date.format('MMM');
      meses.push(key);
      if(meses.includes(key)){
        eventos[new Date(item.fechaInicio).getMonth()] ++;
      }
      else{
        eventos[new Date(item.fechaInicio).getMonth()] = 1;
      }
    });

    meses = [...new Set(meses)];
    const eventosG: number[] = [];
    eventos.forEach((e) => {
      if( e > 0 ){
        eventosG.push(e)
      }
    } );
    this.barchartEvento = {
      series: [
        {
          name: "Eventos",
          data:eventosG 
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Eventos en el año"
      },
      xaxis: {
        categories: meses
      }
    }
    this.radialChartEvento = {
      series: radiales,
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
      colors: [HEXGenerator(), HEXGenerator(), HEXGenerator()],
      labels: ["Boletos Totales", "Pagados", "No Pagados"],
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
              show: true
            }
          }
        }
      ]
    };
  
  }

  graficasOportunidad(){}

  graficasApoyos(){
    
  }


}
