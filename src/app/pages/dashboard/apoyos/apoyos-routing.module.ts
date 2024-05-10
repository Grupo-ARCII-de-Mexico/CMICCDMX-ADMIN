import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApoyosPage } from './apoyos.page';

const routes: Routes = [
  {
    path: '',
    component: ApoyosPage,
    children:[
      {
        path: 'crear-apoyos',
        loadChildren: () => import('./components/crear-apoyo/crear-apoyo.module').then( m => m.CrearApoyoPageModule)
      },
      {
        path: 'editar-apoyos/:identificador',
        loadChildren: () => import('./components/crear-apoyo/crear-apoyo.module').then( m => m.CrearApoyoPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./components/ver-apoyo/ver-apoyo.module').then( m => m.VerApoyoPageModule)
      },
      {
        path: 'ver-usuarios/:identificador',
        loadChildren: () => import('./components/ver-usuarios/ver-usuarios.module').then( m => m.VerUsuariosPageModule)
      },
    ]
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApoyosPageRoutingModule {}
