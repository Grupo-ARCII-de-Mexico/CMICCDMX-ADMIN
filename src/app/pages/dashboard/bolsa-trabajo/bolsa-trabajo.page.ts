import { Component, OnInit } from '@angular/core';
import { BolsaTrabajo, BolsaTrabajoRepository } from 'src/app/shared/repos/bolsaTrabajo.repository';
import { GenericService } from 'src/app/shared/services/generic-service';

@Component({
  selector: 'app-bolsa-trabajo',
  templateUrl: './bolsa-trabajo.page.html',
  styleUrls: ['./bolsa-trabajo.page.scss'],
})
export class BolsaTrabajoPage implements OnInit {

  constructor(
    private gService:GenericService,
    private bolsaRepo:BolsaTrabajoRepository
  ) { }

  ngOnInit() {
    this.gService.getAll<BolsaTrabajo[]>('bolsa-trabajo').subscribe((res) => this.bolsaRepo.setBolsaTrabajo(res))
  }
}
