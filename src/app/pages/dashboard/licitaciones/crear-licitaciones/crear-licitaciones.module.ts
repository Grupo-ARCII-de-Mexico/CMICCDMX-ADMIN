import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearLicitacionesPageRoutingModule } from './crear-licitaciones-routing.module';

import { CrearLicitacionesPage } from './crear-licitaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearLicitacionesPageRoutingModule
  ],
  declarations: [CrearLicitacionesPage]
})
export class CrearLicitacionesPageModule {}
