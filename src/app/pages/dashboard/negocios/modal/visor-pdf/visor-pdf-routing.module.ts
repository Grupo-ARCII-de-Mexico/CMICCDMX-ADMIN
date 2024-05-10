import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisorPdfPage } from './visor-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: VisorPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisorPdfPageRoutingModule {}
