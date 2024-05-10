import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerNegociosPage } from './ver-negocios.page';

const routes: Routes = [
  {
    path: '',
    component: VerNegociosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerNegociosPageRoutingModule {}
