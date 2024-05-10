import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { ComisionesRepository } from 'src/app/shared/repos/comisiones.repo';
import { DepartamentoRepository } from 'src/app/shared/repos/directorio.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';

@Component({
  selector: 'app-directorio-crear',
  templateUrl: './directorio-crear.page.html',
  styleUrls: ['./directorio-crear.page.scss'],
})
export class DirectorioCrearPage implements OnInit {
  editar:boolean = false;
  depaForm!: FormGroup;
  constructor(
    private fb:FormBuilder,
    private compress:CompressImageService,
    private depaRepo:DepartamentoRepository,
    private toast:ToastrService,
    private genericS:GenericService,
    private params:ActivatedRoute,
    private nav:NavController,
    private loading:LoadingService
  ) { }
  identificador!:number;
  depa:string=""
  departamentos:any
  ngOnInit() {
    this.depaForm= this.fb.group({
      nombre:[null, Validators.required],
      correo:[null, Validators.required],
      cargo:[null, Validators.required],
      departamento:[null, Validators.required],
    })

    this.params.params.pipe(
      switchMap( (res:any) => {
        this.identificador = Number(res?.id ?? 0) 
        return this.depaRepo.directorio$
      }),
    ).subscribe(async (res:any) => {
      this.departamentos = res;
     if(this.identificador !== 0 ){
      for (const departamento of res) {
        const directorio = departamento.directorios.find((dir:any) => dir.id === this.identificador);
        if (directorio) {
          this.depaForm.setValue({
            nombre:directorio.nombre,
            correo:directorio.correo,
            cargo:directorio.cargo,
            departamento:departamento.id
          })
          this.editar=true
          break;
        }
      }

     }
    })
  }



  async  createDepartamento(){
    this.loading.setData({
      animated:true,
      message:'Guardando',
      spinner:'dots'
    });
    await this.loading.create();
    await this.loading.show();
    this.genericS.post('departamento',{nombre:this.depa}).subscribe(async (depa) => {
      this.departamentos.push(depa)
      this.depa = ""
      await this.loading.hide();
      this.toast.success('Registro Guardado');
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
    this.genericS.post('directorio',this.depaForm.value).subscribe(async (depa) => {
      const find = this.departamentos.find((depa:any) => depa.id === this.depaForm.controls['departamento'].value)
      find.directorios.push(depa)
      this.depaRepo.updateDepartamento(find.id,{directorios:find.directorios});
      await this.loading.hide();
      this.toast.success('Registro Guardado');
      this.depaForm.reset();
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
    this.genericS.update('directorio',this.identificador,this.depaForm.value).subscribe(async (depa:any) => {
      let find = this.departamentos.find((depa:any) => depa.id === this.depaForm.controls['departamento'].value)
      find.directorios = find.directorios.map((d:any) => d.id === depa.id ? depa : d);
      this.depaRepo.updateDepartamento(find.id,{directorios:find.directorios});
      await this.loading.hide();
      this.toast.success('Registro Actualizado');
      this.depaForm.reset();
      this.nav.navigateBack('/dashboard/website/directorio')
    })
  }
}
