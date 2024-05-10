import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComisionesVerPageRoutingModule } from './comisiones-ver-routing.module';

import { ComisionesVerPage } from './comisiones-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComisionesVerPageRoutingModule
  ],
  declarations: [ComisionesVerPage]
})
export class ComisionesVerPageModule {}
