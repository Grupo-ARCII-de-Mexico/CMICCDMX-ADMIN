import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert!:HTMLIonAlertElement;
  alertOptions!:AlertOptions

  constructor(
    private alertController:AlertController
  ) { }

  async create() {
    this.alert = await this.alertController.create({
      ...this.alertOptions
    })
  }

  async show(){
    await this.alert.present()
  }

  async hide(){
    await this.alert.dismiss()
  }

  async setData(alertOptions:AlertOptions){
    this.alertOptions=alertOptions;
    await this.create();
    await this.show();
  }

}
