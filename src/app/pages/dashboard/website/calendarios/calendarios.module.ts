import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendariosPageRoutingModule } from './calendarios-routing.module';

import { CalendariosPage } from './calendarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendariosPageRoutingModule
  ],
  declarations: [CalendariosPage]
})
export class CalendariosPageModule {}
