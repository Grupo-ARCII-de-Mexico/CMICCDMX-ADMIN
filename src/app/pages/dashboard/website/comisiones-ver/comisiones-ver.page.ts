import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Comisiones, ComisionesRepository } from 'src/app/shared/repos/comisiones.repo';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comisiones-ver',
  templateUrl: './comisiones-ver.page.html',
  styleUrls: ['./comisiones-ver.page.scss'],
})
export class ComisionesVerPage implements OnInit {

  uri:string = environment.image + 'comisiones/'

  sliders:Comisiones[] = []
  constructor(
    private sliderRepo:ComisionesRepository,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private genericS:GenericService
  ){}
  ngOnInit(): void {
      this.sliderRepo.comisiones$.subscribe((res) => {
        this.sliders=res
      })
  }


 async  deleteSlider(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar este Slider',
      message:'Si lo elimina se perderán todos los datos relacionados. \n ¿Desea continuar?',
      buttons:[
        {
          text:'Cancelar'
        },
        {
          text:'Confirmar',
          handler:async ()=> {
            this.loading.setData({
              animated:true,
              message:'Eliminando',
              spinner:'dots'
            });
            await this.loading.create();
            await this.loading.show();
            this.genericS.delete('comisiones',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Comisión Eliminado');
              this.sliderRepo.deleteComisiones(id)
            })
          }
        }
      ]
    })
  }




}
