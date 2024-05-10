import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import * as XLSX from 'xlsx';

import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { Licitacion, LicitacionRepository } from 'src/app/shared/repos/licitacion.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/tools/alert.service';
@Component({
  selector: 'app-crear-licitaciones',
  templateUrl: './crear-licitaciones.page.html',
  styleUrls: ['./crear-licitaciones.page.scss'],
})
export class CrearLicitacionesPage implements OnInit {
  year=new Date().getFullYear()
  edit:boolean = false;
  licitacionForm!:FormGroup
  constructor(
    private fb : FormBuilder,
    private toast:ToastrService,
    private load:LoadingService,
    private licitacionRepo:LicitacionRepository,
    private genericService:GenericService,
    private activeParams:ActivatedRoute,
    private nav:NavController,
    private loading:LoadingService,
    private alert:AlertService
  ) { }
identificador!:string;
licitaciones:Licitacion[]=[];
  ngOnInit() {
    this.licitacionRepo.licitaciones$.subscribe((res) => {
      this.licitaciones = res;
    })
    this.licitacionForm = this.fb.group({
   
      procedimiento: [null],

      portal: [null],
  
      noProcedimiento: [null],
  
      unidadCompradora: [null],
  
      descripcionExpediente: [null],
  
      fechaPublicacion: [null],
  
      fechaLimiteBases: [null],
  
      fechaapertura: [null],
  
      fallo: [null],
  
      vigencia: [null],
  
      link: [null],
    })
   
      this.activeParams.params.pipe(
        switchMap( (res:any) =>{
          this.identificador=res.identificador;
          if(res.identificador){
            this.edit=true
          }
          return this.licitacionRepo.licitaciones$
        }
        ),
        tap( licitaciones => {
          if(this.edit){
            const find = licitaciones.find((l) => l.id === Number(this.identificador))
            if(find){
              this.licitacionForm.setValue({
                procedimiento:find.procedimiento,

                portal:find.portal,
            
                noProcedimiento: find.noProcedimiento,
            
                unidadCompradora:find.unidadCompradora,
            
                descripcionExpediente:find.descripcionExpediente,
            
                fechaPublicacion: find.fechaPublicacion,
            
                fechaLimiteBases: find.fechaLimiteBases,
            
                fechaapertura: find.fechaapertura,
            
                fallo: find.fallo,
            
                vigencia: find.vigencia,
            
                link: find.link,
              })
            }
          }
        
        })
      ).subscribe();
  
    
  }

  async save(){
    if(this.edit){
      await this.update();
      return
    }
    await this.load.setData({
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Creando Licitación...'
    })
    await this.load.create();
    await this.load.show();
  
    this.genericService.post<Licitacion>('licitaciones',this.licitacionForm.value).subscribe(async (res) => {

     this.licitacionForm.reset()
      this.licitacionRepo.addLicitacion(res);
     await this.load.hide();
     this.toast.success('Licitación Guardada')
     this.nav.navigateForward('/dashboard/licitaciones')
    })
    
  }

async update(){
  await this.load.setData({
    animated:true,
    spinner: 'dots',
    translucent:true,
    message:'Guardando Cambios...'
  })
  await this.load.create();
  await this.load.show();

  this.genericService.update<Licitacion>('licitaciones',Number(this.identificador),this.licitacionForm.value).subscribe(async (res) => {

   this.licitacionForm.reset()
    this.licitacionRepo.updateLicitacion(Number(this.identificador),res);
   await this.load.hide();
   this.toast.success('Licitación Actualizada')
   this.nav.navigateForward('/dashboard/licitaciones')
  })
}

file:any;
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

}
