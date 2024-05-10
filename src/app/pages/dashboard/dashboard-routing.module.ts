import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosPageModule),
        title: 'MODULO DE EVENTOS | CRM | CMIC CDMX'
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserPageModule),
        title: 'MODULO DE USUARIO | CRM | CMIC CDMX'
      },
      {
        path: 'negocios',
        loadChildren: () => import('./negocios/negocios.module').then(m => m.NegociosPageModule),
        title: 'MODULO DE NEGOCIOS | CRM | CMIC CDMX'
      },
      {
        path: 'apoyos',
        loadChildren: () => import('./apoyos/apoyos.module').then(m => m.ApoyosPageModule),
        title: 'MODULO DE APOYOS | CRM | CMIC CDMX'
      },
      {
        path: 'licitaciones',
        loadChildren: () => import('./licitaciones/licitaciones.module').then( m => m.LicitacionesPageModule),
        title: 'MODULO DE LICITACIONES | CRM | CMIC CDMX'
      },
      {
        path: 'apoyos',
        loadChildren: () => import('./apoyos/apoyos.module').then( m => m.ApoyosPageModule),
        title: 'MODULO DE APOYOS | CRM | CMIC CDMX'
      },
      {
        path: 'website',
        loadChildren: () => import('./website/website.module').then( m => m.WebsitePageModule),
        title: 'MODULO DE WEBSITE | CRM | CMIC CDMX'
      },
      {
        path: 'bolsa-trabajo',
        loadChildren: () => import('./bolsa-trabajo/bolsa-trabajo.module').then( m => m.BolsaTrabajoPageModule),
        title: 'MODULO DE BOLSA DE TRABAJO | CRM | CMIC CDMX'
      },
      {
        path: 'estadisticas',
        loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule),
        title: 'MODULO DE BOLSA DE ESTADISTICAS | CRM | CMIC CDMX'
      },
      {
        path: 'afiliados',
        loadChildren: () => import('./afiliados/afiliados.module').then( m => m.AfiliadosPageModule),
        title: 'MODULO DE AFILIADOS | CRM | CMIC CDMX'
      },
    
    
    
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
