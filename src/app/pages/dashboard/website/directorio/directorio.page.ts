import { Component, OnInit } from '@angular/core';
import { Departamento, DepartamentoRepository } from 'src/app/shared/repos/directorio.repository';
import { GenericService } from 'src/app/shared/services/generic-service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage implements OnInit {

  constructor(
    private genericS:GenericService,
    private depaRepo:DepartamentoRepository
  ) { }

  ngOnInit() {
    this.genericS.getAll<Departamento[]>('departamento').subscribe((res) => {
        this.depaRepo.setDepartamento(res)
    }) 
  }

}
