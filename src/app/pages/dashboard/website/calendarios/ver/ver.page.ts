import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Calendario, CalendarioRepository } from 'src/app/shared/repos/calendarios.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.page.html',
  styleUrls: ['./ver.page.scss'],
})
export class VerPage implements OnInit {

  constructor(
    private depaRepo:CalendarioRepository,
    private loading:LoadingService,
    private genericS:GenericService,
    private alert:AlertService,
    private toast:ToastrService
  ) { }
depas!:Calendario[]
  ngOnInit() {
    this.depaRepo.calendario$.subscribe((res) => {
      this.depas = res;
    })
  }



  async  deleteDirectorio(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar este registro',
      message:'¿Desea continuar?',
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
            this.genericS.delete('calendario-capacitaciones',id).subscribe(async (_) => {
              await this.loading.hide();
              this.depaRepo.deleteCalendario(id);
              this.toast.success('Registro Eliminado');
            })
          }
        }
      ]
    })
  }

  Calendario = ['ICIC','ITC','FIC']

}
