import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfiliadosPageRoutingModule } from './afiliados-routing.module';

import { AfiliadosPage } from './afiliados.page';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { TablaComponent } from 'src/app/shared/components/tabla/tabla.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfiliadosPageRoutingModule,
    TablaComponent,
    PipeModule
  ],
  declarations: [AfiliadosPage]
})
export class AfiliadosPageModule {}
