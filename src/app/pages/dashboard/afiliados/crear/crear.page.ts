import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { Afiliado, AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { LoadingService } from 'src/app/shared/tools/loading.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  year=new Date().getFullYear()
  edit:boolean = false;
  afiliadoForm!:FormGroup
  constructor(
    private fb : FormBuilder,
    private toast:ToastrService,
    private load:LoadingService,
    private afiliadoRepo:AfiliadoRepository,
    private genericService:GenericService,
    private activeParams:ActivatedRoute,
    private nav:NavController
  ) { }
identificador!:string;
  ngOnInit() {
    this.afiliadoForm = this.fb.group({
   
      fechaEmision: [null],
 
      fechaFacturacion: [null],
 
      fechaPagoDelegacion: [null],
 
      registro: [null],
 
      certificado: [null],
 
      nip: [null],
 
      inicioOperaciones: [null],
 
      nombre: [null],
 
      representanteLegal: [null],
 
      tamano: [null],
 
      telefono1: [null],
 
      telefono2: [null],
 
      correo1: [null],
 
      correo2: [null],
 
      anosConsecutivos: [null],
 
      ultimoAno: [null],
 
      especialidad1: [null],
 
      especialidad2: [null],
 
      especialidad3: [null],
 
      cumpleanos: [null],
    })
   
      this.activeParams.params.pipe(
        switchMap( (res:any) =>{
          this.identificador=res.id;
          if(res.id){
            this.edit=true
          }
          return this.afiliadoRepo.user$
        }
        ),
        tap( afiliados => {
          if(this.edit){
            const find = afiliados.find((l) => l.id === Number(this.identificador))
            if(find){
              this.afiliadoForm.setValue({
                fechaEmision: find.fechaEmision,
                fechaFacturacion: find.fechaFacturacion,
                fechaPagoDelegacion: find.fechaPagoDelegacion,
                registro: find.registro,
                certificado: find.certificado,
                nip: find.nip,
                inicioOperaciones: find.inicioOperaciones,
                nombre: find.nombre,
                representanteLegal: find.representanteLegal,
                tamano: find.tamano,
                telefono1: find.telefono1,
                telefono2: find.telefono2,
                correo1: find.correo1,
                correo2: find.correo2,
                anosConsecutivos: find.anosConsecutivos,
                ultimoAno: find.ultimoAno,
                especialidad1: find.especialidad1,
                especialidad2: find.especialidad2,
                especialidad3: find.especialidad3,
                cumpleanos: find.cumpleanos,
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
      message:'Creando Afiliado...'
    })
    await this.load.create();
    await this.load.show();
  
    this.genericService.post<Afiliado>('afiliados',this.afiliadoForm.value).subscribe(async (res) => {

     this.afiliadoForm.reset()
      this.afiliadoRepo.addAfiliado(res);
     await this.load.hide();
     this.toast.success('Afiliado Guardada')
     this.nav.navigateForward('/dashboard/afiliados')
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

  this.genericService.update<Afiliado>('afiliados',Number(this.identificador),this.afiliadoForm.value).subscribe(async (res) => {

   this.afiliadoForm.reset()
    this.afiliadoRepo.updateAfiliado(Number(this.identificador),res);
   await this.load.hide();
   this.toast.success('Afiliado Actualizada')
   this.nav.navigateForward('/dashboard/afiliados')
  })
}

file:any;
onFileSelected(event: any): void {
  this.file = {
    documento :  'file',
    uri :  event.target.files[0]
  }
  event.target.value = ''
}

click(id:any){
  const fileInput = document.getElementById(id) as HTMLInputElement;
  fileInput.click();
}


}
