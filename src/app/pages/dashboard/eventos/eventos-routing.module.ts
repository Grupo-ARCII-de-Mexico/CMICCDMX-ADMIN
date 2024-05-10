import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosPage } from './eventos.page';

const routes: Routes = [
  {
    path: '',
    component: EventosPage,
    children:[
      {
        path: '',
        loadChildren: () => import('./ver-evento/ver-evento.module').then( m => m.VerEventoPageModule)
      },
      {
        path: 'registrar-usuario',
        loadChildren: () => import('./registrar-usuario/registrar-usuario.module').then( m => m.RegistrarUsuarioPageModule)
      },
      {
        path: 'ver-usuarios',
        loadChildren: () => import('./ver-usuarios/ver-usuarios.module').then( m => m.VerUsuariosPageModule)
      },
 
      {
        path: 'crear-evento',
        loadChildren: () => import('./crear-evento/crear-evento.module').then( m => m.CrearEventoPageModule)
      },
      {
        path: 'editar-evento/:id',
        loadChildren: () => import('./crear-evento/crear-evento.module').then( m => m.CrearEventoPageModule)
      }
    ]
  },
  {
    path: 'map',
    loadChildren: () => import('./components/map/map.module').then( m => m.MapPageModule)
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosPageRoutingModule {}
