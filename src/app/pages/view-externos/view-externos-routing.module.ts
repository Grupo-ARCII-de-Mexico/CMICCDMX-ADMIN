import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewExternosPage } from './view-externos.page';

const routes: Routes = [
  {
    path: '',
    component: ViewExternosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewExternosPageRoutingModule {}
