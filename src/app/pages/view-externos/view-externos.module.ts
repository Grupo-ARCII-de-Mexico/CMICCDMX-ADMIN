import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewExternosPageRoutingModule } from './view-externos-routing.module';

import { ViewExternosPage } from './view-externos.page';
import { HeaderPageModule } from 'src/app/shared/components/header/header.module';
import { VerInscripcionesPageModule } from '../dashboard/negocios/ver-inscripciones/ver-inscripciones.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewExternosPageRoutingModule,
    HeaderPageModule,
    VerInscripcionesPageModule
  ],
  declarations: [ViewExternosPage]
})
export class ViewExternosPageModule {}
