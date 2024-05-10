import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.page.html',
  styleUrls: ['./redes.page.scss'],
})
export class RedesPage implements OnInit {

  constructor() { }

  buttons= [
    {
      color:'facebook',
      url:'https://www.facebook.com/CMICCDMX',
      icon:'logo-facebook'
    },
    {
      color:'instagram',
      url:'https://www.instagram.com/cmic.cdmx/',
      icon:'logo-instagram'
    },
    {
      color:'linkedin',
      url:'https://www.linkedin.com/company/cmiccdmx',
      icon:'logo-linkedin'
    },
    {
      color:'youtube',
      url:'https://www.youtube.com/channel/UCNT08GAl28pxLXH7heNz5qg',
      icon:'logo-youtube'
    },
    {
      color:'whatsapp',
      url:'https://wa.me/message/62UJCIOZ4MLQF1',
      icon:'logo-whatsapp'
    }
  ]

  ngOnInit() {
    document.body.classList.add('transparent');
  }
  async open(url:string){
    window.open(url,'_blank');
   }
}
