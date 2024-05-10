import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NegociosPage } from './negocios.page';

const routes: Routes = [
  {
    path: '',
    component: NegociosPage,
    children:[
      {
        path: '',
        loadChildren: () => import('./ver-negocios/ver-negocios.module').then( m => m.VerNegociosPageModule)
      },
      {
        path: 'crear-oportunidad',
        loadChildren: () => import('./crear-oportunidad/crear-oportunidad.module').then( m => m.CrearOportunidadPageModule)
      },
      {
        path: 'editar-oportunidad/:identificador',
        loadChildren: () => import('./crear-oportunidad/crear-oportunidad.module').then( m => m.CrearOportunidadPageModule)
      },
      {
        path: ':identificador',
        loadChildren: () => import('./ver-inscripciones/ver-inscripciones.module').then( m => m.VerInscripcionesPageModule)
      },
    
    ]
  },
  {
    path: 'ver-solicitud',
    loadChildren: () => import('./modal/ver-solicitud/ver-solicitud.module').then( m => m.VerSolicitudPageModule)
  },
  {
    path: 'visor-pdf',
    loadChildren: () => import('./modal/visor-pdf/visor-pdf.module').then( m => m.VisorPdfPageModule)
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegociosPageRoutingModule {}
