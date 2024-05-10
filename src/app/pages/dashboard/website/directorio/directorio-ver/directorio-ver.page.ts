import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Departamento, DepartamentoRepository } from 'src/app/shared/repos/directorio.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';

@Component({
  selector: 'app-directorio-ver',
  templateUrl: './directorio-ver.page.html',
  styleUrls: ['./directorio-ver.page.scss'],
})
export class DirectorioVerPage implements OnInit {

  constructor(
    private depaRepo:DepartamentoRepository,
    private loading:LoadingService,
    private genericS:GenericService,
    private alert:AlertService,
    private toast:ToastrService
  ) { }
depas!:Departamento[]
  ngOnInit() {
    this.depaRepo.directorio$.subscribe((res) => {
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
            this.genericS.delete('directorio',id).subscribe(async (_) => {
              await this.loading.hide();
              this.eliminarDirectorio(id);
              this.toast.success('Registro Eliminado');
            })
          }
        }
      ]
    })
  }

  eliminarDirectorio(id:number){
    for (const departamento of this.depas) {
      const index = departamento.directorios.findIndex(directorio => directorio.id === id);
      if (index !== -1) {
        departamento.directorios.splice(index, 1); // Eliminar el directorio del arreglo
        break; // Salir del bucle una vez que se haya eliminado el directorio
      }
    }
  }
}
