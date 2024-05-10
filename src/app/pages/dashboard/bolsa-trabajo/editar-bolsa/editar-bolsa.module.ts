import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarBolsaPageRoutingModule } from './editar-bolsa-routing.module';

import { EditarBolsaPage } from './editar-bolsa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarBolsaPageRoutingModule
  ],
  declarations: [EditarBolsaPage]
})
export class EditarBolsaPageModule {}
