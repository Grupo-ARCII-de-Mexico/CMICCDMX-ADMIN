import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerUsuariosPageRoutingModule } from './ver-usuarios-routing.module';

import { VerUsuariosPage } from './ver-usuarios.page';
import { FiltroUsuarioPipe } from 'src/app/shared/pipes/filtro-usuario';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';
import { TablaComponent } from 'src/app/shared/components/tabla/tabla.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerUsuariosPageRoutingModule,
    PipeModule,
    TablaComponent
  ],
  declarations: [VerUsuariosPage]
})
export class VerUsuariosPageModule {}
