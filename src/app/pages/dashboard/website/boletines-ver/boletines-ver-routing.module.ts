import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletinesVerPage } from './boletines-ver.page';

const routes: Routes = [
  {
    path: '',
    component: BoletinesVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletinesVerPageRoutingModule {}
