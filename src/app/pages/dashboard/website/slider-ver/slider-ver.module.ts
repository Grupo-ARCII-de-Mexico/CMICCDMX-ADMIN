import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SliderVerPageRoutingModule } from './slider-ver-routing.module';

import { SliderVerPage } from './slider-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SliderVerPageRoutingModule
  ],
  declarations: [SliderVerPage]
})
export class SliderVerPageModule {}
