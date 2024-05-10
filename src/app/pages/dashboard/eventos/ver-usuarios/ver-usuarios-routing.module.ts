import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerUsuariosPage } from './ver-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: VerUsuariosPage
  },
  {
    path: 'editar-usuario',
    loadChildren: () => import('./editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerUsuariosPageRoutingModule {}
