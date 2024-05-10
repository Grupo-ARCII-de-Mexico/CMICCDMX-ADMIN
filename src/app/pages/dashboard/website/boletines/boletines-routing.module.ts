import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletinesPage } from './boletines.page';

const routes: Routes = [
  {
    path: '',
    component: BoletinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletinesPageRoutingModule {}
