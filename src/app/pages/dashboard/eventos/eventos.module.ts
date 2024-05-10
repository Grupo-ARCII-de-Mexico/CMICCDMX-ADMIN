import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventosPageRoutingModule } from './eventos-routing.module';
import { EventosPage } from './eventos.page';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EventosPageRoutingModule,
    NgxEditorModule,
    
  ],
  declarations: [EventosPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EventosPageModule {}
