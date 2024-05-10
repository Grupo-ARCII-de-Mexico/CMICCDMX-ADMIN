import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu.interface';
import { TypeItem } from '../../enums/type.item.enum';
import { NavController, PopoverController } from '@ionic/angular';
import { AuthRepository } from '../../repos/auth.repository';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss'],
})
export class MenuItemPage implements OnInit {
  @Input() item!:Menu
  @Input() color!:string
  @Input() lines:string = 'none'
  readonly typeItem = TypeItem;
  url!:string;
  constructor(
    private auth:AuthRepository,
    private nav:NavController,
    private popOver:PopoverController,
    private router:Router
  ) { }

  ngOnInit() { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url  
        console.log(this.url);
        
      }
    });
  }

  async actionMenu(url:string,event?:any){
    if(url === ''){
      event.preventDefault();
      await this.auth.logout();
      this.popOver.dismiss();
      return;
    }
    this.nav.navigateForward(url);
  }
}
