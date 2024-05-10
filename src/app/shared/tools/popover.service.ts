import { Injectable } from '@angular/core';
import { PopoverController, PopoverOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  popover!:HTMLIonPopoverElement
  popoverOption!: PopoverOptions
  constructor(
    private popoverController:PopoverController
  ) { }

  async create(){
    this.popover = await this.popoverController.create({
      ...this.popoverOption
    });
  }

  async show(){
     await this.popover.present()
  }

  async hide(){
    await this.popover.dismiss();
  }

  async setData(popoverOption:PopoverOptions){
    this.popoverOption = popoverOption
  }


}
