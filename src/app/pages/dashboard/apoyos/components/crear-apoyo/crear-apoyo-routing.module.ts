import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearApoyoPage } from './crear-apoyo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearApoyoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearApoyoPageRoutingModule {}
