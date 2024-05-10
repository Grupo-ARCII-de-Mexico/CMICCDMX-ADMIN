import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StripeService, StripeCardNumberComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { tap} from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'card-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {
  @Output() recuperarToken = new EventEmitter<string>();
  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;
  @Input() comision = 0;
  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };
  color:string ="black"
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: 'white',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
      invalid: {
        color: 'white' // Color de texto de error
      },
    },
  };
  stripeTest!:FormGroup;
  loadingP!: HTMLIonLoadingElement
  readonly tipoTarjeta = TipoTarjeta;
  constructor(
    private stripeService: StripeService,
    private fb:FormBuilder,
    private toast:ToastrService,
    private loading:LoadingController
  ) { }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: [null, [Validators.required]],
    })
  }


  brand!:string;
  tarjetaValida:boolean=false;
  identificarMarcaTarjeta(card: any) {
    this.brand = card.brand
    this.tarjetaValida = card.complete
    
  }

  async save(){
    this.loadingP = await this.loading.create({
      id:'pago',
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Registrando Pago...'
    });
    await this.loadingP.present();
    this.stripeService
      .createToken(this.card.element, { name:this.stripeTest.controls['name'].value || '' }).pipe(
        tap(async (tokenResult: any) => {
          if(tokenResult.error){
            this.toast.error(tokenResult.error.message)
            await this.loadingP.dismiss()
          }else{
            await this.loading.dismiss();
            this.recuperarToken.emit(tokenResult.token.id as string)
          }
        })
      ).subscribe()
  }


}

export enum TipoTarjeta {
  VISA='visa',
  MASTERCARD='mastercard',
  AMERICAN_EXPRESS='amex',
  DESCONOCIDA='unknown'
}
