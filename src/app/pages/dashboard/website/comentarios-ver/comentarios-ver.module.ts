import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosVerPageRoutingModule } from './comentarios-ver-routing.module';

import { ComentariosVerPage } from './comentarios-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosVerPageRoutingModule
  ],
  declarations: [ComentariosVerPage]
})
export class ComentariosVerPageModule {}
