import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Calendario, CalendarioRepository } from 'src/app/shared/repos/calendarios.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { LoadingService } from 'src/app/shared/tools/loading.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  editar:boolean = false;
  constructor(
    private depaRepo:CalendarioRepository,
    private toast:ToastrService,
    private genericS:GenericService,
    private params:ActivatedRoute,
    private nav:NavController,
    private loading:LoadingService
  ) { }
  identificador!:number;
  nombre:string=""
  tipo:number=-1
  ngOnInit() {
    this.params.params.pipe(
      switchMap( (res:any) => {
        this.identificador = Number(res?.id ?? 0) 
        return this.depaRepo.calendario$
      }),
    ).subscribe(async (res:any) => {
     if(this.identificador !== 0 ){
      const directorio = res.find((dir:any) => dir.id === this.identificador);
      this.nombre= directorio.texto 
      this.tipo = directorio.tipo
      this.editar=true
     }
    })
  }


 async  save(){
  if(this.editar){
    await this.edit()
    return
  }
    this.loading.setData({
      animated:true,
      message:'Guardando',
      spinner:'dots'
    });
    await this.loading.create();
    await this.loading.show();


    this.genericS.post<Calendario>('calendario-capacitaciones',this.createFormData()).subscribe(async (depa) => {
      this.depaRepo.addCalendario(depa);
      await this.loading.hide();
      this.tipo=-1;
      this.nombre=""
      this.file=undefined;
      this.toast.success('Calendario Guardado');
    })
  }


  async  edit(){
    this.loading.setData({
      animated:true,
      message:'Guardando',
      spinner:'dots'
    });
    await this.loading.create();
    await this.loading.show();
    this.genericS.update<Calendario>('calendario-capacitaciones',this.identificador,this.createFormData()).subscribe(async (depa:any) => {
      this.depaRepo.updateCalendario(depa.id,depa);
      await this.loading.hide();
      this.tipo=-1;
      this.nombre=""
      this.file=undefined;
      this.toast.success('Calendario Actualizado');
      this.nav.navigateBack('/dashboard/website/calendarios')
    })
  }


  createFormData(){
    const formdata = new FormData()
    formdata.append('texto',this.nombre)
    formdata.append('tipo',String(this.tipo))
    formdata.append('file',this.file)
    return formdata
  }

  file:any;
  onFileSelected(event: any): void {
    this.file =  event.target.files[0]
    event.target.value = ''
  }

  click(id:any){
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput.click();
  }

}
