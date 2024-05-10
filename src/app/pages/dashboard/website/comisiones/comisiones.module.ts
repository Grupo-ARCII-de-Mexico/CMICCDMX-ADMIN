import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComisionesPageRoutingModule } from './comisiones-routing.module';

import { ComisionesPage } from './comisiones.page';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEditorModule,
    ComisionesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ComisionesPage]
})
export class ComisionesPageModule {}
