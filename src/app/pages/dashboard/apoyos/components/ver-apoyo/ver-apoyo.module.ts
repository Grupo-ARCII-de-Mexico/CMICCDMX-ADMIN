import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerApoyoPageRoutingModule } from './ver-apoyo-routing.module';

import { VerApoyoPage } from './ver-apoyo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerApoyoPageRoutingModule
  ],
  declarations: [VerApoyoPage]
})
export class VerApoyoPageModule {}
