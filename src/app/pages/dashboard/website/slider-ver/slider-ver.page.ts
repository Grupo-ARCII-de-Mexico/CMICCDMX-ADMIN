import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Slider, SliderRepository } from 'src/app/shared/repos/slider.repo';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slider-ver',
  templateUrl: './slider-ver.page.html',
  styleUrls: ['./slider-ver.page.scss'],
})
export class SliderVerPage implements OnInit {

  uri:string = environment.image + 'sliders/'

  sliders:Slider[] = []
  constructor(
    private sliderRepo:SliderRepository,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private genericS:GenericService
  ){}
  ngOnInit(): void {
      this.sliderRepo.slider$.subscribe(async (res) => {
        this.sliders=res.sort((a,b) => a.position - b.position)
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
            this.genericS.delete('sliders',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Slider Eliminado');
              this.sliderRepo.deleteSlider(id)
            })
          }
        }
      ]
    })
  }

  positionChange:boolean = false;
  async handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    const movedItem = this.sliders.splice(ev.detail.from, 1)[0];

    // Insertar el elemento movido en la posición deseada
    this.sliders.splice(ev.detail.to, 0, movedItem);
    this.positionChange=true;
    console.log(this.sliders);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }


  async updatePosition(){
    this.loading.setData({
      animated:true,
      message:'Guardando',
      spinner:'dots'
    });
    await this.loading.create();
    await this.loading.show();
    let i=0;
    for (const slider of this.sliders){
    await this.genericS.update('sliders',slider.id,{position:i}).toPromise()
    i++
    }
    this.positionChange=false;
    this.toast.success('Reposicionamiento Guardado','Success')
    await this.loading.hide();
  }

}
