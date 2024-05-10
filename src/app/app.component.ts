import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from './shared/tools/loading.service';
import { HeaderStatusService } from './shared/services/active-header.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private loading:LoadingService,
    private headerStatusService:HeaderStatusService
    ) {
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
          headerStatusService.setValue(true)
        if(event.url.includes('website')){
          await this.loading.setData({
            animated:true,
            message:'Cargando ...',
            duration:500
          })
          await this.loading.create();
          await this.loading.show();
        }
      }
    });
  }
}
