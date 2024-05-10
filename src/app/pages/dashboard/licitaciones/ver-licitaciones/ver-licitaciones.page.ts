import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import * as moment from 'moment';
import { Licitacion, LicitacionRepository } from 'src/app/shared/repos/licitacion.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ver-licitaciones',
  templateUrl: './ver-licitaciones.page.html',
  styleUrls: ['./ver-licitaciones.page.scss'],
})
export class VerLicitacionesPage implements OnInit {
  @Input() visible = true;
  licitaciones: Licitacion[] = [];
  constructor(
    private licitacionRepo:LicitacionRepository,
    private genericService:GenericService,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService
  ) { }

  ngOnInit() {
    this.licitacionRepo.licitaciones$.subscribe((res) => {
      this.licitaciones = res;
      this.licitacionesSelected = res.slice(0,this.divisor)
    })
  }
  mon(date:Date){
    return moment(date).locale('es').format('L') + ' ' + moment(new Date(date)).utc().format('LTS')
  }
  
  async deleteEvento(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar esta licitación',
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
            this.genericService.delete('licitaciones',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Licitación Eliminada');
              this.licitacionRepo.deleteLicitacion(id);
            })
          }
        }
      ]
    });
  }
  file:any
 async  onFileSelected(event: any) {
  this.loading.setData({
    animated:true,
    message:'Cargando licitaciones',
    spinner:'dots'
  });
  await this.loading.create();
  await this.loading.show();
    this.file = {
      documento :  'file',
      uri :  event.target.files[0]
    }
    if (this.file) {
      const lector = new FileReader();

      lector.onload = async (e: any) => {
        // Lee el contenido del archivo como una cadena binaria
        const datos = e.target.result;
        
        // Convierte la cadena binaria a un objeto de trabajo de Excel
        const libro = XLSX.read(datos, { type: 'binary' });

        // Obtén la primera hoja de cálculo del libro
        const hoja = libro.SheetNames[0];

       // Convierte la hoja de cálculo a un arreglo de arreglos
       let datosArray:any = XLSX.utils.sheet_to_json(libro.Sheets[hoja], { header: 1 });

       // Elimina las filas que están completamente vacías
       datosArray = datosArray.filter((fila:any) => fila.some((valor:any) => valor !== undefined && valor !== null && valor !== ''));
      
       datosArray.shift();

        for (let array of datosArray) {
        this.licitacionesToCreate.push(
        {   
          procedimiento:array[1] ?? null,
          portal:array[2] ?? null,
            
          noProcedimiento: array[3] ?? null,
      
          unidadCompradora:array[4] ?? null,
      
          descripcionExpediente:array[5] ?? null,
      
          fechaPublicacion: new Date((array[6] - 1) * 24 * 60 * 60 * 1000 + Date.UTC(1900, 0, 1)) ?? undefined,
      
          fechaLimiteBases: new Date((array[7] - 1) * 24 * 60 * 60 * 1000 + Date.UTC(1900, 0, 1)) ?? undefined,
      
          fechaapertura: new Date((array[8] - 1) * 24 * 60 * 60 * 1000 + Date.UTC(1900, 0, 1)) ?? undefined,
      
          fallo: new Date((array[9] - 1) * 24 * 60 * 60 * 1000 + Date.UTC(1900, 0, 1)) ?? undefined,
      
          vigencia: array[10] ?? null,
      
          link: array[11] ?? null,
        }
       )
          
        }
        const partes = [];

        for (let i = 0; i < this.licitacionesToCreate.length; i += 100) {
          partes.push(this.licitacionesToCreate.slice(i, i + 100));
        }
        await this.loading.hide()
        console.log(this.licitacionesToCreate);
        
        await this.alertMassiveUpload(partes)

      };
 
      lector.readAsBinaryString(this.file.uri);
    }
  }
  
  click(id:any){
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput.click();
  }



  licitacionesToCreate :Partial<Licitacion>[] = []

  licitacionModal!:Licitacion;
  openModal: boolean = false;
  async alertMassiveUpload(partes:any ){
    await this.alert.setData({
      animated:true,
      header:'Se van a subir y/o actualizar ' + this.licitacionesToCreate.length + ' licitaciones',
      message:'Esto puede tomar un tiempo ¿Desea Continuar?',
      buttons:[
        {
          text:'Cancelar',
          handler: () => {
            const fileInput = document.getElementById('in') as HTMLInputElement;
            if (fileInput) {
              fileInput.value = ''; // Esto permite seleccionar el mismo archivo nuevamente
            }
            this.licitacionesToCreate = []
            this.file = {}}
        },
        {
          text:'Cargar Licitaciones',
          handler: async () => {
            this.loading.setData({
              animated:true,
              message:'Subiendo Licitaciones espere...',
              spinner:'dots'
            });
            await this.loading.create();
            await this.loading.show();
            for(const parte of partes){
              const result = await this.genericService.post<{nuevos:Licitacion[],updates:Licitacion[]}>('licitaciones/massive',parte).toPromise() as any
              for(let upd of result.updates){
                this.licitaciones = this.licitaciones.map((l) => l.id === upd.id ? upd : l );
              }
              const newArrayLicitaciones = [...this.licitaciones,...result.nuevos]
              this.licitacionRepo.setLicitacion(newArrayLicitaciones)
            }
            this.toast.success('Licitaciones Guardadas')
            await this.loading.hide();
            this.file = {}
            const fileInput = document.getElementById('in') as HTMLInputElement;
            this.licitacionesToCreate = []
            if (fileInput) {
              fileInput.value = ''; // Esto permite seleccionar el mismo archivo nuevamente
            }
          }
        }
      ] 
    })

  }

  search!:string;
  licitacionesSelected:Licitacion[]= []
  divisor = 15;
  pagina= 0 
   getPagina(pagina:number){
    this.pagina= pagina
      this.licitacionesSelected= this.licitaciones.slice((pagina)*this.divisor,(pagina+1)*this.divisor)
   }

}
