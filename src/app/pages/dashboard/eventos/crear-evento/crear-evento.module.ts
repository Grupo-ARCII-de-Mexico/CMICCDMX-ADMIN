import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEventoPageRoutingModule } from './crear-evento-routing.module';

import { CrearEventoPage } from './crear-evento.page';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxEditorModule,
    ReactiveFormsModule,
    CrearEventoPageRoutingModule,
    
  ],
  declarations: [CrearEventoPage]
})
export class CrearEventoPageModule {}
