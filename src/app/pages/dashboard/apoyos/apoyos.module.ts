import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApoyosPageRoutingModule } from './apoyos-routing.module';

import { ApoyosPage } from './apoyos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApoyosPageRoutingModule
  ],
  declarations: [ApoyosPage]
})
export class ApoyosPageModule {}
