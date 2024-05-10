import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisorPdfPageRoutingModule } from './visor-pdf-routing.module';

import { VisorPdfPage } from './visor-pdf.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisorPdfPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [VisorPdfPage]
})
export class VisorPdfPageModule {}
