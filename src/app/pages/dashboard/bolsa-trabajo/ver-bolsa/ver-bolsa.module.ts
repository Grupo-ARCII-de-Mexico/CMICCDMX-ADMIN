import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerBolsaPageRoutingModule } from './ver-bolsa-routing.module';

import { VerBolsaPage } from './ver-bolsa.page';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { TablaComponent } from 'src/app/shared/components/tabla/tabla.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablaComponent,
    VerBolsaPageRoutingModule,
    PipeModule
  ],
  declarations: [VerBolsaPage]
})
export class VerBolsaPageModule {}
