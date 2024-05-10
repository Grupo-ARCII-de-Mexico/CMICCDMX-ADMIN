import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectorioVerPageRoutingModule } from './directorio-ver-routing.module';

import { DirectorioVerPage } from './directorio-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectorioVerPageRoutingModule
  ],
  declarations: [DirectorioVerPage]
})
export class DirectorioVerPageModule {}
