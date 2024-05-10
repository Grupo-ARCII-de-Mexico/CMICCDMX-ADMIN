import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { switchMap, tap } from 'rxjs/operators';
import { BarChartOptions } from 'src/app/shared/components/charts/interfaces/bar-chart.interface';
import { PieChartOptions } from 'src/app/shared/components/charts/interfaces/pie-chart.interface';
import { RadialBarChart } from 'src/app/shared/components/charts/interfaces/radial-chart.interface';
import { Afiliado, AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';
import { Apoyos, ApoyosRepository } from 'src/app/shared/repos/apoyo.repository';
import { Evento, EventoRepository } from 'src/app/shared/repos/evento.repository';
import { Negocio, NegocioRepository } from 'src/app/shared/repos/negocio.repository';
import { HEXGenerator } from 'src/app/shared/tools/hex.generator';
import { environment } from 'src/environments/environment';

moment.locale('ES')

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  barchartEvento!:BarChartOptions;
  radialChartEvento!:RadialBarChart;
  eventos:Evento[]=[];
  apoyos:Apoyos[]=[];
  negocios:Negocio[]=[];
  afiliados:Afiliado[]=[];
  afiliadosCumpleanos:Afiliado[]=[];
  afiliadosInicioOperaciones:Afiliado[]=[];
  aniversario=true;
  constructor(
    private eventoRepo:EventoRepository,
    private apoyoRepo:ApoyosRepository,
    private oportunidadRepo:NegocioRepository,
    private afiliadosRepo:AfiliadoRepository
  ) { }

  ngOnInit() {
    this.eventoRepo.evento$.pipe(
      switchMap( eventos => {
        this.eventos = eventos.filter(evento => {
          const fechaInicio = moment(evento.fechaInicio);
          const hoy = moment();
          const sieteDiasDespues = moment().add(30, 'days');
          return fechaInicio.isSameOrAfter(hoy) && fechaInicio.isSameOrBefore(sieteDiasDespues);
        });
        return this.apoyoRepo.user$
      }),
      switchMap( apoyos => {
        this.apoyos = apoyos;
        return this.afiliadosRepo.user$
      } ),
      switchMap( afiliados => {
        this.afiliados = afiliados;
        this.afiliadosCumpleanos = afiliados.filter(afiliado => {
          const cumpleanos = moment(afiliado.cumpleanos);
          const hoy = moment();
          const treintaDiasDespues = moment().add(30, 'days');
          return cumpleanos.isSameOrAfter(hoy) && cumpleanos.isSameOrBefore(treintaDiasDespues);
        });
        this.afiliadosInicioOperaciones = afiliados.filter(afiliado => {
          const inicioOperaciones = moment(afiliado.inicioOperaciones);
          const hoy = moment();
          const treintaDiasDespues = moment().add(30, 'days');
          return inicioOperaciones.isSameOrAfter(hoy) && inicioOperaciones.isSameOrBefore(treintaDiasDespues);
        });
        return this.oportunidadRepo.negocio$
      } ),
      tap(negocios => {
        this.negocios = negocios;
      })
    ).subscribe()
  
  }



  mon(date:Date){
    return moment(date).locale('es').fromNow()
  }

  uri: string = environment.image + 'eventos/'

}

