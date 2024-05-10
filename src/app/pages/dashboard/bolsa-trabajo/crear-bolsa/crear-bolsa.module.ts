import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearBolsaPageRoutingModule } from './crear-bolsa-routing.module';

import { CrearBolsaPage } from './crear-bolsa.page';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearBolsaPageRoutingModule,
    NgxEditorModule,
  ],
  declarations: [CrearBolsaPage]
})
export class CrearBolsaPageModule {}
