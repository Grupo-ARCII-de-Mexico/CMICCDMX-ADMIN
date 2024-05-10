import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerInscripcionesPageRoutingModule } from './ver-inscripciones-routing.module';

import { VerInscripcionesPage } from './ver-inscripciones.page';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerInscripcionesPageRoutingModule,
    PipeModule
  ],
  declarations: [VerInscripcionesPage],
  exports:[VerInscripcionesPage]
})
export class VerInscripcionesPageModule {}
