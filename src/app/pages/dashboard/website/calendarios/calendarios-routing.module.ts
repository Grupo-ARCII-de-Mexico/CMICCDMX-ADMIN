import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendariosPage } from './calendarios.page';

const routes: Routes = [
  {
    path: '',
    component: CalendariosPage,
    children:[
      {
        path: '',
        loadChildren: () => import('./ver/ver.module').then( m => m.VerPageModule)
      },
      {
        path: 'crear',
        loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
      },
     
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendariosPageRoutingModule {}
