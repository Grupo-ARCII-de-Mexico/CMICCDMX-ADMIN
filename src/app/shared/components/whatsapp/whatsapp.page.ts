import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from './popover/popover.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.page.html',
  styleUrls: ['./whatsapp.page.scss'],
})
export class WhatsappPage implements OnInit {

  constructor(
    private route:Router,
    private popover:PopoverController
  ) { }

  isIframe: boolean= false;
  ngOnInit() {

    if(this.route.url.split('/')[1] === 'whatsapp'){ 
      this.isIframe = true;
      document.body.classList.add('transparent');
      
    }

    this.open2();
  }

  texto!:string;

  async open(){
   window.open(`https://wa.me/+5215625692061/?text=${this.texto}`,'_blank');
   this.texto = '';
  }


  async open2(){
      const pop = await this.popover.create({
        component:PopoverPage,
        side: this.isIframe ? 'end' : 'start',
        trigger:'open-popover',
        mode:'ios',
        animated:true
      })

      setTimeout(async () => {
        await pop.present()
      }, 3000);
  }
}
