import { Component, OnInit } from '@angular/core';
import { BoletinRepository } from 'src/app/shared/repos/boletin.repository';
import { CalendarioRepository } from 'src/app/shared/repos/calendarios.repository';
import { ComentarioRepository } from 'src/app/shared/repos/comentarios.repo';
import { ComisionesRepository } from 'src/app/shared/repos/comisiones.repo';
import { CursoRepository } from 'src/app/shared/repos/curso.repository';
import { SliderRepository } from 'src/app/shared/repos/slider.repo';
import { GenericService } from 'src/app/shared/services/generic-service';

@Component({
  selector: 'app-website',
  templateUrl: './website.page.html',
  styleUrls: ['./website.page.scss'],
})
export class WebsitePage implements OnInit {

  constructor(
    private sliderRepo:SliderRepository,
    private cursoRepo:CursoRepository,
    private boletinRepo:BoletinRepository,
    private genericS:GenericService,
    private comentarioRepo:ComentarioRepository,
    private comisionRepo:ComisionesRepository,
    private calendarioRepo:CalendarioRepository
  ) { }

  ngOnInit() {
    this.genericS.getAll('sliders').subscribe((res:any) => this.sliderRepo.setSliders(res));
    this.genericS.getAll('cursos').subscribe((res:any) => this.cursoRepo.setCursos(res))
    this.genericS.getAll('boletines').subscribe((res:any) => this.boletinRepo.setBoletins(res))
    this.genericS.getAll('comentarios').subscribe((res:any) => this.comentarioRepo.setComentarios(res))
    this.genericS.getAll('comisiones').subscribe((res:any) => this.comisionRepo.setComisioness(res))
    this.genericS.getAll('calendario-capacitaciones').subscribe((res:any) => this.calendarioRepo.setCalendarios(res))
    
  }

}
