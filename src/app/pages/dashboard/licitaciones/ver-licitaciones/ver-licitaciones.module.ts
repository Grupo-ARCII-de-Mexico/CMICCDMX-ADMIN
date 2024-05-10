import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerLicitacionesPageRoutingModule } from './ver-licitaciones-routing.module';

import { VerLicitacionesPage } from './ver-licitaciones.page';
import { TablaComponent } from 'src/app/shared/components/tabla/tabla.component';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerLicitacionesPageRoutingModule,
    TablaComponent,
    PipeModule
  ],
  declarations: [VerLicitacionesPage],
  exports:[VerLicitacionesPage]
})
export class VerLicitacionesPageModule {}
