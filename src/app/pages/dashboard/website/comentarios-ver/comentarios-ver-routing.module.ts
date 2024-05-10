import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentariosVerPage } from './comentarios-ver.page';

const routes: Routes = [
  {
    path: '',
    component: ComentariosVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentariosVerPageRoutingModule {}
