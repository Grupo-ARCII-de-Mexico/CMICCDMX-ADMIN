import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearLicitacionesPage } from './crear-licitaciones.page';

const routes: Routes = [
  {
    path: '',
    component: CrearLicitacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearLicitacionesPageRoutingModule {}
