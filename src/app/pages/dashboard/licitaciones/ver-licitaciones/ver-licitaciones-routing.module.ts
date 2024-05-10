import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerLicitacionesPage } from './ver-licitaciones.page';

const routes: Routes = [
  {
    path: '',
    component: VerLicitacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerLicitacionesPageRoutingModule {}
