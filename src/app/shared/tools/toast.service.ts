import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toast!:HTMLIonToastElement;
  private toastOptions!:ToastOptions;

  constructor(
    private toastS:ToastController
  ) { 
  }


  async create() {
    this.toast = await this.toastS.create({
      ...this.toastOptions
    })
  }


  async show(){
    await this.toast.present();
  }

  async hide () {
    await this.toast.dismiss()
  }

  setData(toastOptions:ToastOptions ){
    this.toastOptions = toastOptions;
  }

}
