import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './estadisticas-routing.module';

import { EstadisticasPage } from './estadisticas.page';
import { PieChartComponent } from 'src/app/shared/components/charts/pie-chart/pie-chart.component';
import { RadialChartComponent } from 'src/app/shared/components/charts/radial-chart/radial-chart.component';
import { BarChartComponent } from 'src/app/shared/components/charts/bar-chart/bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticasPageRoutingModule,
    BarChartComponent,
    RadialChartComponent,
    PieChartComponent
  ],
  declarations: [EstadisticasPage]
})
export class EstadisticasPageModule {}
