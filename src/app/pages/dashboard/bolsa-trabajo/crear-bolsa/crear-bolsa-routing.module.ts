import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearBolsaPage } from './crear-bolsa.page';

const routes: Routes = [
  {
    path: '',
    component: CrearBolsaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearBolsaPageRoutingModule {}
