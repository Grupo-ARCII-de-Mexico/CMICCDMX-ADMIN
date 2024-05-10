import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursosVerPageRoutingModule } from './cursos-ver-routing.module';

import { CursosVerPage } from './cursos-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosVerPageRoutingModule
  ],
  declarations: [CursosVerPage]
})
export class CursosVerPageModule {}
