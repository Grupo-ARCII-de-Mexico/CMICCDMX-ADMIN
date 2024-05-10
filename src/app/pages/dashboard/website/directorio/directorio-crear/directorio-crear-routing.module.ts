import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorioCrearPage } from './directorio-crear.page';

const routes: Routes = [
  {
    path: '',
    component: DirectorioCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorioCrearPageRoutingModule {}
