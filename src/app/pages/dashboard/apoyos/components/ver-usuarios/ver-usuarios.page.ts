import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApoyosRepository } from 'src/app/shared/repos/apoyo.repository';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.page.html',
  styleUrls: ['./ver-usuarios.page.scss'],
})
export class VerUsuariosPage implements OnInit {

  apoyos:any=[];
  constructor(
    private active:ActivatedRoute,
    private apoyosRepo:ApoyosRepository,
    private nav:NavController
  ) { }

  ngOnInit() {
    this.active.params.pipe(
    ).subscribe((res: any) => {
      this.apoyosRepo.user$.subscribe((result) => {
        const find = result.find((r) => r.identificador === res.identificador)
        if(!find){
          this.nav.navigateBack('/dashboard/apoyos');
        }
        this.apoyos = find?.apoyos;
      })
    })
  }

  
}
