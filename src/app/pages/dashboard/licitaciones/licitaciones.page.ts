import { Component, OnInit } from '@angular/core';
import { Licitacion, LicitacionRepository } from 'src/app/shared/repos/licitacion.repository';
import { GenericService } from 'src/app/shared/services/generic-service';

@Component({
  selector: 'app-licitaciones',
  templateUrl: './licitaciones.page.html',
  styleUrls: ['./licitaciones.page.scss'],
})
export class LicitacionesPage implements OnInit {

  constructor(
    private gService:GenericService,
    private licitacionRepo:LicitacionRepository
  ) { }

  ngOnInit() {
    this.gService.getAll<Licitacion[]>('licitaciones').subscribe((res) => this.licitacionRepo.setLicitacion(res))
  }

}
