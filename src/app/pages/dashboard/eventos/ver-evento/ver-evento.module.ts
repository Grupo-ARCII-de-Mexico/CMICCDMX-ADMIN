import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerEventoPageRoutingModule } from './ver-evento-routing.module';

import { VerEventoPage } from './ver-evento.page';
import { TablaComponent } from 'src/app/shared/components/tabla/tabla.component';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerEventoPageRoutingModule,
    TablaComponent,
    PipeModule
  ],
  declarations: [VerEventoPage]
})
export class VerEventoPageModule {}
