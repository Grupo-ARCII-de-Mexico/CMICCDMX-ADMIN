import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerApoyoPage } from './ver-apoyo.page';

const routes: Routes = [
  {
    path: '',
    component: VerApoyoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerApoyoPageRoutingModule {}
