import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerBolsaPage } from './ver-bolsa.page';

const routes: Routes = [
  {
    path: '',
    component: VerBolsaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerBolsaPageRoutingModule {}
