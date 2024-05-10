import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ApoyosRepository } from 'src/app/shared/repos/apoyo.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ver-apoyo',
  templateUrl: './ver-apoyo.page.html',
  styleUrls: ['./ver-apoyo.page.scss'],
})
export class VerApoyoPage implements OnInit {

  uri: string = environment.image + 'apoyos-dn/'
  eventos:any[]=[];
  constructor(
    private nav:NavController,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private genericService:GenericService,
    private apoyos:ApoyosRepository
  ) { }

  ngOnInit() {

    this.apoyos.user$.subscribe((eventos) => {
      this.eventos=eventos;
    })
  }

  mon(date:Date){
    return moment(date).locale('es').format('L') + ' ' + moment(new Date(date)).utc().format('LTS')
  }

  async vistaPrevia(id:number){
    const evento = this.eventos.find((e) => e.id === id );
    if(evento){
      window.open(environment.host+'apoyo/'+evento.identificador,'_blank')
    }
  }

  exportToExcel(id:number) { 
    const evento = this.eventos.find( e => e.id ===id);
    
    let data = []
    for(let boleto of evento?.apoyos){ 
      data.push(
        {
          Nombre : boleto ? boleto?.nombre : (boleto?.nombre ?? ""),
          Cargo : boleto ? boleto?.cargo : (boleto?.cargo ?? ""),
          Empresa : boleto ? boleto?.empresa : (boleto?.empresa ?? ""),
          Correo: boleto ? boleto?.email : (boleto?.email ?? ''),
          "Teléfono": boleto ? boleto?.telefono : (boleto?.telefono ?? ''),
          RFC: boleto ? boleto?.rfc : (boleto?.rfc ?? ""),
        }
      );
  
    }

    
    if(data){
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, evento?.titulo.toUpperCase()+'.xlsx');
    }
  }


  async deleteEvento(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar este Apoyo',
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
            this.genericService.delete('desastres',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Evento Eliminado');
              this.apoyos.deleteApoyo(id)
            })
          }
        }
      ]
    })
  }


  async cerrarEvento(id:number){
    await this.alert.setData({
      animated:true,
      header:'Cerrar Apoyo',
      message:'Está a punto de cerrar el Apoyo una vez lo haga no podrá reabrilo ¿Desea Continuar?',
      buttons:[
        {
          text:'Cancelar'
        },
        {
          text:'Cerrar',
          handler: async () => {
            this.genericService.update<any>('desastres',id,{active: false}).subscribe( res => {
              this.eventos = this.eventos.map((e) => e.id === id ? res : e);
              this.toast.success('Apoyo Cerrado');
            })
          } 
        }
      ]
    });
  }

  async people(id:number){
  
  }

}
