import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitacionesPage } from './licitaciones.page';

const routes: Routes = [
  {
    path: '',
    component: LicitacionesPage,
    children:[
      {
        path: '',
        loadChildren: () => import('./ver-licitaciones/ver-licitaciones.module').then( m => m.VerLicitacionesPageModule)
      },
      {
        path: 'crear-licitaciones',
        loadChildren: () => import('./crear-licitaciones/crear-licitaciones.module').then( m => m.CrearLicitacionesPageModule)
      },
      {
        path: 'editar-licitaciones/:identificador',
        loadChildren: () => import('./crear-licitaciones/crear-licitaciones.module').then( m => m.CrearLicitacionesPageModule)
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitacionesPageRoutingModule {}
