import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BolsaTrabajoPage } from './bolsa-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: BolsaTrabajoPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./ver-bolsa/ver-bolsa.module').then( m => m.VerBolsaPageModule)
      },
      {
        path: 'crear-bolsa-trabajo',
        loadChildren: () => import('./crear-bolsa/crear-bolsa.module').then( m => m.CrearBolsaPageModule)
      },
      {
        path: 'editar-bolsa/:identificador',
        loadChildren: () => import('./crear-bolsa/crear-bolsa.module').then( m => m.CrearBolsaPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BolsaTrabajoPageRoutingModule {}
