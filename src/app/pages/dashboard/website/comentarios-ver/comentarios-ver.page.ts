import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comentario, ComentarioRepository } from 'src/app/shared/repos/comentarios.repo';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-comentarios-ver',
  templateUrl: './comentarios-ver.page.html',
  styleUrls: ['./comentarios-ver.page.scss'],
})
export class ComentariosVerPage implements OnInit {

  uri:string = environment.image + 'comentarios/'

  sliders:Comentario[] = []
  constructor(
    private sliderRepo:ComentarioRepository,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private genericS:GenericService
  ){}
  ngOnInit(): void {
      this.sliderRepo.comentario$.subscribe((res) => {
        this.sliders=res
      })
  }


 async  deleteSlider(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar este comentario',
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
            this.genericS.delete('comentarios',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Comentario Eliminado');
              this.sliderRepo.deleteComentario(id)
            })
          }
        }
      ]
    })
  }
}
