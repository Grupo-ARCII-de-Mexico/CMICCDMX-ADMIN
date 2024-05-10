import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorioVerPage } from './directorio-ver.page';

const routes: Routes = [
  {
    path: '',
    component: DirectorioVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorioVerPageRoutingModule {}
