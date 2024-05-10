import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SliderVerPage } from './slider-ver.page';

const routes: Routes = [
  {
    path: '',
    component: SliderVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SliderVerPageRoutingModule {}
