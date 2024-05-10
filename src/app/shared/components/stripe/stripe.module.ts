import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripePageRoutingModule } from './stripe-routing.module';

import { StripePage } from './stripe.page';
import { environment } from 'src/environments/environment';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StripePageRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripeKey),
  ],
  declarations: [StripePage],
  exports:[StripePage],
})
export class StripePageModule {}
