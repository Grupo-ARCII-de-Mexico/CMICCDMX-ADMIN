import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfiliadosPage } from './afiliados.page';

const routes: Routes = [
  {
    path: '',
    component: AfiliadosPage
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'ver',
    loadChildren: () => import('./ver/ver.module').then( m => m.VerPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfiliadosPageRoutingModule {}
