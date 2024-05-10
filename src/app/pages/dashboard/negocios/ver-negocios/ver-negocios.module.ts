import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerNegociosPageRoutingModule } from './ver-negocios-routing.module';

import { VerNegociosPage } from './ver-negocios.page';
import { TablaComponent } from 'src/app/shared/components/tabla/tabla.component';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerNegociosPageRoutingModule,
    TablaComponent,
    PipeModule
  ],
  declarations: [VerNegociosPage],
  exports:[VerNegociosPage]
})
export class VerNegociosPageModule {}
