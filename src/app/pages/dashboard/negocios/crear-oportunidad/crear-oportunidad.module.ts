import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearOportunidadPageRoutingModule } from './crear-oportunidad-routing.module';

import { CrearOportunidadPage } from './crear-oportunidad.page';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxEditorModule,
    CrearOportunidadPageRoutingModule
  ],
  declarations: [CrearOportunidadPage]
})
export class CrearOportunidadPageModule {}
