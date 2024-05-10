import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletinesPageRoutingModule } from './boletines-routing.module';

import { BoletinesPage } from './boletines.page';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxEditorModule,
    ReactiveFormsModule,
    IonicModule,
    BoletinesPageRoutingModule
  ],
  declarations: [BoletinesPage]
})
export class BoletinesPageModule {}
