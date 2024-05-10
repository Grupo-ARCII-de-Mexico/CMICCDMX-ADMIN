import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarBolsaPage } from './editar-bolsa.page';

const routes: Routes = [
  {
    path: '',
    component: EditarBolsaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarBolsaPageRoutingModule {}
