import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosVerPage } from './cursos-ver.page';

const routes: Routes = [
  {
    path: '',
    component: CursosVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosVerPageRoutingModule {}
