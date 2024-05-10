import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearApoyoPageRoutingModule } from './crear-apoyo-routing.module';

import { CrearApoyoPage } from './crear-apoyo.page';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearApoyoPageRoutingModule,
    NgxEditorModule
  ],
  declarations: [CrearApoyoPage]
})
export class CrearApoyoPageModule {}
