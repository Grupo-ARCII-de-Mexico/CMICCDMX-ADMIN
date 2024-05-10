import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading!:HTMLIonLoadingElement;
  private loadingOptions!:LoadingOptions;
  constructor(
    private loadingS:LoadingController
  ) {
   }


  async create() {
    this.loading = await this.loadingS.create({
      ...this.loadingOptions
    })
  }

  async show() {
   await this.loading.present()
  }

  async hide() {
    await this.loading.dismiss()
  }

  async setData(loadingOptions:LoadingOptions){
    this.loadingOptions= loadingOptions;
  }


}
