import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletinesVerPageRoutingModule } from './boletines-ver-routing.module';

import { BoletinesVerPage } from './boletines-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletinesVerPageRoutingModule
  ],
  declarations: [BoletinesVerPage]
})
export class BoletinesVerPageModule {}
