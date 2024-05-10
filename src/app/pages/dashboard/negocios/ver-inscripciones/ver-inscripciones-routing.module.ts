import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerInscripcionesPage } from './ver-inscripciones.page';

const routes: Routes = [
  {
    path: '',
    component: VerInscripcionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerInscripcionesPageRoutingModule {}
