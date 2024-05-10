import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BolsaTrabajoPageRoutingModule } from './bolsa-trabajo-routing.module';

import { BolsaTrabajoPage } from './bolsa-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BolsaTrabajoPageRoutingModule
  ],
  declarations: [BolsaTrabajoPage]
})
export class BolsaTrabajoPageModule {}
