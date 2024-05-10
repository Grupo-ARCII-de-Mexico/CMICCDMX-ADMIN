import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Boletin, BoletinRepository } from 'src/app/shared/repos/boletin.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boletines-ver',
  templateUrl: './boletines-ver.page.html',
  styleUrls: ['./boletines-ver.page.scss'],
})
export class BoletinesVerPage implements OnInit {

  uri:string = environment.image + 'boletines/'

  sliders:Boletin[] = []
  constructor(
    private sliderRepo:BoletinRepository,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private genericS:GenericService
  ){}
  ngOnInit(): void {
      this.sliderRepo.boletin$.subscribe((res) => {
        this.sliders=res
      })
  }


 async  deleteSlider(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar este boletín',
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
            this.genericS.delete('boletines',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Boletín Eliminado');
              this.sliderRepo.deleteBoletin(id)
            })
          }
        }
      ]
    })
  }

  meterimagen(boletin:Boletin){
    if(boletin.imagen){
      return this.uri + boletin.imagen;
    }else{
      console.log(this.uri + boletin.imagenes[0]);
      
      return this.uri + boletin.imagenes[0];
    }
  }

}
