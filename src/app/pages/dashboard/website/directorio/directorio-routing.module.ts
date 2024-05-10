import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorioPage } from './directorio.page';

const routes: Routes = [
  {
    path: '',
    component: DirectorioPage,
    children:[
      {
        path: '',
        loadChildren: () => import('./directorio-ver/directorio-ver.module').then( m => m.DirectorioVerPageModule)
      },
      {
        path: 'crear',
        loadChildren: () => import('./directorio-crear/directorio-crear.module').then( m => m.DirectorioCrearPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./directorio-crear/directorio-crear.module').then( m => m.DirectorioCrearPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorioPageRoutingModule {}
