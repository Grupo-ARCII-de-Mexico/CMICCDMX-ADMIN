import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerEventoPage } from './ver-evento.page';

const routes: Routes = [
  {
    path: '',
    component: VerEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerEventoPageRoutingModule {}
