import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { BarChartComponent } from 'src/app/shared/components/charts/bar-chart/bar-chart.component';
import { RadialChartComponent } from 'src/app/shared/components/charts/radial-chart/radial-chart.component';
import { PieChartComponent } from 'src/app/shared/components/charts/pie-chart/pie-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BarChartComponent,
    RadialChartComponent,
    PieChartComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
