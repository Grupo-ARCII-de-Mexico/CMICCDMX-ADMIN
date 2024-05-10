import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComisionesVerPage } from './comisiones-ver.page';

const routes: Routes = [
  {
    path: '',
    component: ComisionesVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComisionesVerPageRoutingModule {}
