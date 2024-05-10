import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Curso, CursoRepository } from 'src/app/shared/repos/curso.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cursos-ver',
  templateUrl: './cursos-ver.page.html',
  styleUrls: ['./cursos-ver.page.scss'],
})
export class CursosVerPage implements OnInit {

  uri:string = environment.image + 'cursos/'

  sliders:Curso[] = []
  constructor(
    private sliderRepo:CursoRepository,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private genericS:GenericService
  ){}
  ngOnInit(): void {
      this.sliderRepo.curso$.subscribe((res) => {
        this.sliders=res
      })
  }


 async  deleteSlider(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar este curso',
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
            this.genericS.delete('cursos',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Curso Eliminado');
              this.sliderRepo.deleteCurso(id)
            })
          }
        }
      ]
    })
  }

}
